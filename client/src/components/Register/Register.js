import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Input from '../Form/Input/Input';
import './Register.scss';

const Register = () => {
    const [isPassword, setIsPassword] = useState(true)

    const handleClick = () => {
        setIsPassword(!isPassword)
    }
    
    return (
        <form className="register">
            <Input type={'text'} placeholder={'Email'} />
            <Input
                type={isPassword ? 'password' : 'text'}
            placeholder={'Password'}
                icon={isPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                handleClick={handleClick}
                name={'password'}
            />
            <Input
                type={isPassword ? 'password' : 'text'}
                placeholder={'Confirm password'}
                icon={isPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                handleClick={handleClick}
                name={'confirmPassword'}
            />
            <div className="form-wrapper-btn">
                <button className="form-btn">Register</button>
                <button className="form-btn">Register with Google</button>
            </div>
        </form>
    );
};

export default Register;
