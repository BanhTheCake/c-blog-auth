import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import useLogin from '../../api/useLogin';
import Input from '../Form/Input/Input';
import InputPassword from '../Form/InputPassword/InputPassword';
import './Login.scss';
import { useGoogleLogin } from '@react-oauth/google';
import useSendAccessTokenGoogle from '../../api/useSendAccessTokenGoogle';

const schema = yup
    .object({
        gmail: yup
            .string('Gmail must be a string !')
            .email('Gmail must be valid !')
            .required('Gmail must be required !'),
        password: yup
            .string('Password must be a string !')
            .required('Password must be required !'),
    })
    .required();

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onError = (err) => {
        return toast.error(err.message);
    };

    const { mutate: handleLogin, isLoading: isLogin } = useLogin({ onError });

    const { mutate: handleSendToken } = useSendAccessTokenGoogle({ onError });

    const onSubmit = (data) => {
        handleLogin(data);
    };

    const handleLoginWithGoogle = useGoogleLogin({
        onSuccess: (res) => {
            const { access_token } = res;
            handleSendToken({ access_token });
        },
        onError: (err) => console.log(err),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="login">
            <Input
                control={control}
                errors={errors}
                type={'text'}
                placeholder={'Gmail'}
                name={'gmail'}
            />
            <InputPassword
                control={control}
                errors={errors}
                placeholder={'Password'}
                name={'password'}
            />
            <div className="form-wrapper-btn">
                <button className="form-btn">
                    {isLogin ? 'Login ...' : 'Log in'}
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLoginWithGoogle();
                    }}
                    className="form-btn"
                >
                    Sign in with Google
                </button>
            </div>
        </form>
    );
};

export default Login;
