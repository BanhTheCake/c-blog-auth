import React from 'react';
import './Input.scss';

const Input = ({ 
    type, 
    name, 
    placeholder, 
    icon,
    text,
    handleClick
}) => {
    return (
        <div className="form-input">
            { icon && <div className="form-icon" onClick={handleClick}> {icon} </div> }
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
            />
            { text && <span className='error-msg'></span> }
        </div>
    );
};

export default Input;
