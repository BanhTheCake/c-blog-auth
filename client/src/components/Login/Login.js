import React, { useEffect } from 'react';
import Input from '../Form/Input/Input';
import './Login.scss';
import InputPassword from '../Form/InputPassword/InputPassword';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useLogin from '../../api/useLogin';
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux";


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

    const dispatch = useDispatch()

    const onError = (err) => {
        return toast.error(err.message)
    }

    const { mutate: handleLogin, isLoading: isLogin } = useLogin({ onError })

    const onSubmit = (data) => {
        handleLogin(data)
    };

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
                <button className="form-btn">{ isLogin ? 'Login ...' : 'Log in' }</button>
                <button className="form-btn">Sign in with Google</button>
            </div>
        </form>
    );
};

export default Login;
