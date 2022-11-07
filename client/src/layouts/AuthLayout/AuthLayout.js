import React, { useState } from 'react';
import Forgot from '../../components/Forgot/Forgot';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import './AuthLayout.scss';



const AuthLayout = () => {
    const [authStatus, setAuthStatus] = useState('login');

    const handleChangeLogin = () => {
        setAuthStatus('login');
    };

    const handleChangeRegister = () => {
        setAuthStatus('register');
    };

    const handleChangeForgot = () => {
        setAuthStatus('forgot');
    };

    return (
        <div className="authLayout">
            <div className="authLayout__logo">
                <img src="./assets/img/logo.svg" alt="" />
            </div>

            {authStatus === 'login' && <Login />}
            {authStatus === 'register' && <Register />}
            {authStatus === 'forgot' && <Forgot />}

            <div className="authLayout__actions">
                {(authStatus === 'register' || authStatus === 'forgot') && (
                    <p className="yellow" onClick={handleChangeLogin}>
                        Login ?
                    </p>
                )}
                {(authStatus === 'login' || authStatus === 'forgot') && (
                    <p className="yellow" onClick={handleChangeRegister}>
                        Register ?
                    </p>
                )}
                {authStatus !== 'forgot' && (
                    <p className="pink" onClick={handleChangeForgot}>
                        Forgot ?
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
