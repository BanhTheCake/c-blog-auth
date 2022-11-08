import React from 'react';
import { setLogger } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRefreshToken from './api/useRefreshToken';
import './App.scss';
import Loading from './components/loading/Loading';
import ActivateLayout from './layouts/ActivateLayout/ActivateLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import ProfilesLayout from './layouts/Profiles/ProfilesLayout';
import ResetLayout from './layouts/ResetLayout/ResetLayout';
import useSetLocalStorageLogin from './utils/useSetLocalStorageLogin';

setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
});

const App = () => {
    // Get State isLogin in localStorage
    useSetLocalStorageLogin();

    let { isLoading, isLogin } = useRefreshToken({}, 'check');

    if (isLoading || isLogin === null) {
        return (
            <div className="loading-page">
                <Loading />
            </div>
        );
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
