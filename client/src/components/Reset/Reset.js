import React, { useState } from 'react';
import Input from '../Form/Input/Input';
import './Reset.scss';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Reset = () => {

    const [isPassword, setIsPassword] = useState(true)

    const handleClick = () => {
        setIsPassword(!isPassword)
    }

    return (
        <form className="reset">
            <Input
                type={isPassword ? 'password' : 'text' }
                placeholder={'Password'}
                icon={isPassword ? <AiFillEyeInvisible /> : <AiFillEye /> }
                handleClick={handleClick}
            />
            <Input
                type={isPassword ? 'password' : 'text' }
                placeholder={'Confirm password'}
                icon={isPassword ? <AiFillEyeInvisible /> : <AiFillEye /> }
                handleClick={handleClick}
                name={'confirmPassword'}
            />
            <div className="form-wrapper-btn">
                <button className='form-btn'>Save</button>
            </div>
        </form>
    );
};

export default Reset;
