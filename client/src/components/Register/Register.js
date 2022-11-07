import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Form/Input/Input';
import InputPassword from '../Form/InputPassword/InputPassword';
import './Register.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useRegister from '../../api/useRegister';
import { toast } from 'react-toastify'

const schema = yup
    .object({
        gmail: yup
            .string('Gmail must be a string !')
            .email('Gmail must be valid !')
            .required('Gmail must be required !'),
        password: yup
            .string('Password must be a string !')
            .required('Password must be required !'),
        cfPassword: yup
            .string('Confirm password must be a string !')
            .required('Confirm password must be required !')
            .oneOf([yup.ref('password')], 'Confirm passwords do not match !'),
    })
    .required();

const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSuccess = (data) => {
        console.log('register', data);
        reset({})
        return toast.success('Register successful! Please check your email.')
    }

    const onError = (err) => {
        console.log('register err', err);
        return toast.error(err.message)
    }

    const { mutate: handleRegister, isLoading: isRegister } = useRegister({ onSuccess, onError })

    const onSubmit = (data) => {
        handleRegister(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="register">
            <Input
                type={'text'}
                placeholder={'Gmail'}
                name={'gmail'}
                control={control}
                errors={errors}
            />
            <InputPassword
                placeholder={'Password'}
                name={'password'}
                control={control}
                errors={errors}
            />
            <InputPassword
                placeholder={'Confirm Password'}
                name={'cfPassword'}
                control={control}
                errors={errors}
            />
            <div className="form-wrapper-btn">
                <button className="form-btn">{ isRegister ? 'Register ...' : 'Register' }</button>
                <button className="form-btn">Register with Google</button>
            </div>
        </form>
    );
};

export default Register;
