import React, { useState } from 'react';
import Reset from '../../components/Reset/Reset';
import './ResetLayout.scss';
import { useNavigate } from 'react-router-dom';

const ResetLayout = () => {

    const navigate = useNavigate()
    const handleClickLogin = () => {
        return navigate('/')
    }

    return (
        <div className="authLayout">
            <div className="authLayout__logo">
                <img src="./../../assets/img/logo.svg" alt="" />
            </div>
            <Reset />
            <div className="authLayout__actions">
                <p className="pink" onClick={handleClickLogin}>
                    Login ?
                </p>
            </div>
        </div>
    );
};

export default ResetLayout;
