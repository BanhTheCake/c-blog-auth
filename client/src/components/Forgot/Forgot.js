import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Form/Input/Input';
import './Forgot.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useForgotPassword from '../../api/useForgotPassword';
import { toast } from 'react-toastify'
 
const schema = yup
    .object({
        gmail: yup
            .string('Gmail must be a string !')
            .email('Gmail must be valid !')
            .required('Gmail must be required !'),
    })
    .required();

const Forgot = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSuccess = (data) => {
        console.log('forgot pass', data);
        return toast.success('Please check your email to confirm !')
    }
    
    const onError = (err) => {
        console.log('forgot pass err', err);
        return toast.error(err.message) 
    }

    const { mutate: handleForgot, isLoading } = useForgotPassword({ onSuccess, onError })

    const onSubmit = (data) => {
        console.log(data);
        handleForgot(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="forgot">
            <Input
                type={'text'}
                placeholder={'Gmail'}
                name={'gmail'}
                control={control}
                errors={errors}
            />
            <div className="form-wrapper-btn">
                <button className="form-btn">{ isLoading ? 'Send ... ' : 'Send gmail' }</button>
            </div>
        </form>
    );
};

export default Forgot;
