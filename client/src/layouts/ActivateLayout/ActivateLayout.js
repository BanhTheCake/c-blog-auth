import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useActivateAccount from '../../api/useActivateAccount';
import './ActivateLayout.scss';

const ActivateLayout = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const onSuccess = (data) => {
        console.log('register', data);
    };

    const { isLoading: isActivated, isError: isActivatedFail, data } =
        useActivateAccount(token, {
            onSuccess,
            refetchOnWindowFocus: false,
            retry: 0,
        });

    const handleClick = () => {
        return navigate('/');
    };

    if (isActivated) {
        return (
            <div className="activate">
                <p>Please wait ... </p>
            </div>
        );
    }

    if (isActivatedFail) {
        return (
            <div className="activate">
                <p onClick={handleClick}>
                    Link has been activated or not exist !
                </p>
            </div>
        );
    }

    return (
        <div className="activate">
            <p onClick={handleClick}> { 'Ready to login ?' } </p>
        </div>
    );
};

export default ActivateLayout;
