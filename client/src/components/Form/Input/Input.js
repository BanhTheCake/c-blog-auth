import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import './Input.scss';

const Input = ({ type, name, placeholder, control, errors, disabled = false }) => {
    const {
        field: { onChange, value },
    } = useController({ name, control, defaultValue: '' });

    return (
        <div className="form-input">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {errors[name] && (
                <span className="error-msg">{errors[name].message}</span>
            )}
        </div>
    );
};

export default Input;
