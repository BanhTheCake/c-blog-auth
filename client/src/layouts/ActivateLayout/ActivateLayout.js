import React from "react";
import { useNavigate } from "react-router-dom";
import './ActivateLayout.scss'

const ActivateLayout = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        return navigate('/')
    }
  return (
    <div className="activate">
        <p onClick={handleClick}> Ready to login ? </p>
    </div>
  );
};

export default ActivateLayout;
