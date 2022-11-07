import React, { useState } from 'react';
import './Reset.scss';
import InputPassword from '../Form/InputPassword/InputPassword';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useVerifyForgotPass from '../../api/useVerifyForgotPass';
import useResetForgotPass from '../../api/useResetForgotPass';
import { toast } from 'react-toastify';

const schema = yup
    .object({
        password: yup
            .string('Password must be a string !')
            .required('Password must be required !'),
        cfPassword: yup
            .string('Confirm password must be a string !')
            .required('Confirm password must be required !')
            .oneOf([yup.ref('password')], 'Confirm passwords do not match !'),
    })
    .required();

const Reset = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { token } = useParams();

    const {
        isLoading: isVerifyToken,
        isError,
        data: dataToken,
    } = useVerifyForgotPass(token, {
        select: (resData) => resData.data,
    });

    const onSuccessReset = (data) => {
        toast.success('Change password complete !');
    };

    const { mutate: handleResetPass, isLoading: isResetPass, isError: isResetError } =
        useResetForgotPass({
            onSuccess: onSuccessReset,
        });

    const onSubmit = (data) => {
        const newData = {
            password: data?.password,
            id: dataToken?.id,
            userToken: dataToken?.userToken,
        };
        handleResetPass(newData);
    };

    return (
        <>
            {isError || isResetError ? (
                <div className="reset-error">
                    Link has been expired or not exist !
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit(onSubmit)} className="reset">
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
                            <button className="form-btn">Save</button>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};

export default Reset;
