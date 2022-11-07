import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Navbar.scss';

const Navbar = () => {

    const [isOpenMenuMobile, setIsOpenMenuMobile] = useState(false)

    const handleToggleOpenMenu = () => {
        setIsOpenMenuMobile(!isOpenMenuMobile)
    }

    return (
        <div className="navbar-wrapper">
            <div className="container navbar">
                <div className="navbar__logo">
                    <div className="img-wrapper">
                        <img src="./assets/img/logo.svg" alt="" />
                    </div>
                    <p className="navbar__logo-text">MERNAUTH</p>
                </div>
                <div className="navbar__avatar" onClick={handleToggleOpenMenu} >
                    <img
                        src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                        alt=""
                    />
                </div>
            </div>
            { isOpenMenuMobile &&  
            <div className="menu-mobile">
                <div className="overlay"  onClick={handleToggleOpenMenu}></div>
                <Sidebar />
            </div>
            }
        </div>
    );
};

export default Navbar;
