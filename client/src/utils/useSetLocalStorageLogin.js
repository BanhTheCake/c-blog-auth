import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../app/auth.slice';

/**
 *
 * @param {boolean} value
 */

const useSetLocalStorageLogin = () => {
    
    const dispatch = useDispatch();
    const isLoginLocal = localStorage.getItem('isLogin')

    useEffect(() => {
        if (isLoginLocal === 'true') {
            dispatch(setIsLogin(true))
        }
        if (isLoginLocal === 'false') {
            dispatch(setIsLogin(false))
        }
    }, [isLoginLocal, dispatch]);
};

export default useSetLocalStorageLogin;
