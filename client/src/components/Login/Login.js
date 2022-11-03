import React, { useState } from 'react';
import Input from '../Form/Input/Input';
import './Login.scss';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Login = () => {

    const [isPassword, setIsPassword] = useState(true)

    const handleClick = () => {
        setIsPassword(!isPassword)
    }

    return (
        <form className="login">
            <Input type={'text'} placeholder={'Email'} />
            <Input
                type={isPassword ? 'password' : 'text' }
                placeholder={'Password'}
                icon={isPassword ? <AiFillEyeInvisible /> : <AiFillEye /> }
                handleClick={handleClick}
            />
            <div className="form-wrapper-btn">
                <button className='form-btn'>Log in</button>
                <button className='form-btn'>Sign in with Google</button>
            </div>
        </form>
    );
};

export default Login;
