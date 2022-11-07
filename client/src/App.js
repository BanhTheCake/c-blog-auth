import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ActivateLayout from './layouts/ActivateLayout/ActivateLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import ProfilesLayout from './layouts/Profiles/ProfilesLayout';
import ResetLayout from './layouts/ResetLayout/ResetLayout';
import { setLogger } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSetLocalStorageLogin from './utils/useSetLocalStorageLogin';
import useRefreshToken from './api/useRefreshToken';

setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
});

const App = () => {

    // Get State isLogin in localStorage
    useSetLocalStorageLogin()

    let { isLoading, isLogin } = useRefreshToken({}, 'check');

    
    if (isLoading || isLogin === null) {
        return ( <div>Loading ... </div> )
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/auth/reset-password/:token"
                        element={<ResetLayout />}
                    />
                    <Route
                        path="/auth/activate/:token"
                        element={<ActivateLayout />}
                    />
                    <Route
                        path="/"
                        element={isLogin ? <ProfilesLayout /> : <AuthLayout />}
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="light"
            />
        </>
    );
};

export default App;
