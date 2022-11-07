import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useGetInfoOwn from '../../api/useGetInfoOwn';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './ProfilesLayout.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../components/Form/Input/Input';
import InputPassword from '../../components/Form/InputPassword/InputPassword';
import useUpdateInfo from '../../api/useUpdateInfo';
import _ from 'lodash';
import { useQueryClient } from 'react-query';

const schema = yup
    .object({
        username: yup
            .string('Username must be a string !')
            .required('Username must be required !'),
        password: yup.string('Password must be a string !'),
        cfPassword: yup
            .string('Confirm password must be a string !')
            .oneOf([yup.ref('password')], 'Confirm passwords do not match !'),
    })
    .required();

const ProfilesLayout = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const resetValue = useMemo(() => {
        return {
            username: "",
            password: "",
            cfPassword: ""
        }
    }, [])

    const [resetToggle, setResetToggle] = useState(true)

    const queryClient = useQueryClient();

    const onErrorGetData = (err) => {
        console.log(err);
        return toast.error(err?.message || 'Something wrong with server ');
    };

    const { data } = useGetInfoOwn({
        onError: onErrorGetData,
        select: (resData) => resData.data,
    });

    const initData = useMemo(() => {
        return { gmail: data?.gmail || '', username: data?.username || '' };
    }, [data]);

    useEffect(() => {
        if (Object.keys(initData).length > 0) {
            const resetData = { ...resetValue, ...initData }
            reset(resetData)
        };
    }, [initData, reset, resetValue, resetToggle]);

    const onSuccess = (data) => {
        return toast.success('Update Info complete !')
    };

    const onError = (err) => {
        // if Database error => turn back to the way it was
        queryClient.setQueryData(['Get Info Owner'], (resData) => {
            const currentData = { ...data };
            return { ...data, data: currentData };
        });
        return toast.error(err?.message || 'Something wrong with server !');
    };

    const { mutate: handleUpdateInfo } = useUpdateInfo({ onSuccess, onError });

    const onSubmit = (data) => {
        // Delete falsy value
        const newData = _.pickBy(data, _.identity);
        
        if (_.isEqual(newData, initData)) {
            return;
        }

        delete newData.cfPassword;
        delete newData.gmail;

        // Update Data for better UX
        
        const copyData = { ...newData };
        if (copyData?.password) delete copyData.password;
        queryClient.setQueryData(['Get Info Owner'], (resData) => {
            const currentData = { ...resData.data, ...copyData };
            return { ...resData, data: currentData };
        });

        // Update Data to database
        handleUpdateInfo(newData);

        // reset form
        setResetToggle(!resetToggle)

    };

    return (
        <div className="ProfilesLayout">
            <Navbar />
            <div className="container ProfilesLayout-content">
                <Sidebar />
                <div className="ProfilesLayout-main">
                    <div className="ProfilesLayout-main__blog">
                        <h4 className="ProfilesLayout-main__blog-title">
                            <div className="img-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                    alt=""
                                />
                            </div>
                            <p>2/22/2022</p>
                        </h4>
                        <div className="ProfilesLayout-main__blog-thumb">
                            <img
                                src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                alt=""
                            />
                        </div>
                        <div className="ProfilesLayout-main__blog-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Hic voluptatem nobis, explicabo minus a eius
                            qui sint! Repellendus accusamus suscipit,
                            architecto, recusandae ullam delectus possimus
                            nostrum corporis, sint dolores hic?
                        </div>
                    </div>
                    <div className="ProfilesLayout-main__user">
                        <div className="ProfilesLayout-main__user-ava">
                            <img
                                src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                alt=""
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="ProfilesLayout-main__user-form"
                        >
                            <Input
                                name={'username'}
                                placeholder={'Name'}
                                control={control}
                                errors={errors}
                            />
                            <Input
                                name={'gmail'}
                                placeholder={'Gmail'}
                                control={control}
                                errors={errors}
                                disabled={true}
                            />
                            <InputPassword
                                name={'password'}
                                placeholder={'Password'}
                                control={control}
                                errors={errors}
                            />
                            <InputPassword
                                name={'cfPassword'}
                                placeholder={'Confirm password'}
                                control={control}
                                errors={errors}
                            />
                            <button className="btn-form">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilesLayout;
