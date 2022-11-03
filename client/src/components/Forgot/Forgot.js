import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Input from '../Form/Input/Input';
import './Forgot.scss';

const Forgot = () => {
    const [isPassword, setIsPassword] = useState(true)

    const handleClick = () => {
        setIsPassword(!isPassword)
    }
    
    return (
        <form className="forgot">
            <Input type={'text'} placeholder={'Email'} />
            <div className="form-wrapper-btn">
                <button className="form-btn">Send gmail</button>
            </div>
        </form>
    );
};

export default Forgot;
