import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ActivateLayout from './layouts/ActivateLayout/ActivateLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import ProfilesLayout from './layouts/Profiles/ProfilesLayout';
import ResetLayout from './layouts/ResetLayout/ResetLayout';

const App = () => {
    const isLogin = true;

    return (
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
                <Route path="/" element={ isLogin ? <ProfilesLayout /> :  <AuthLayout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
