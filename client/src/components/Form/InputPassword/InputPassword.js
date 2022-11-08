import React, { useState } from 'react';
import './InputPassword.scss';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useController } from 'react-hook-form';

const InputPassword = ({
    type = 'text',
    iconVisible = <AiFillEye />,
    iconInvisible = <AiFillEyeInvisible />,
    name,
    placeholder,
    text,
    control,
    errors,
    disabled = false
}) => {

    const { field : { onChange, value } } = useController({ name, control, defaultValue: '' })

    const [isHidden, setIsHidden] = useState(true);

    const handleChangeType = () => {
        setIsHidden(!isHidden)
    }

    return (
        <div className="form-input">
            <div className="form-icon" onClick={handleChangeType}>
                {isHidden ? iconInvisible : iconVisible}
            </div>
            <input
                type={isHidden ? 'password' : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete="true"
            />
            {errors[name] && (
                <span className="error-msg">{errors[name].message}</span>
            )}
        </div>
    );
};

export default InputPassword;
