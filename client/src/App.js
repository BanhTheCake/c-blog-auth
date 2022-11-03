import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import ActivateLayout from './layouts/ActivateLayout/ActivateLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import ResetLayout from './layouts/ResetLayout/ResetLayout';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/reset-password/:token" element={<ResetLayout />} />
                <Route path="/auth/activate/:token" element={<ActivateLayout />} />
                <Route path="/" element={<AuthLayout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
