import React from 'react';
import './Sidebar.scss';
import { TfiBookmarkAlt } from 'react-icons/tfi';
import { AiOutlineProfile } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar">
                <div className="sidebar-tag blue">
                    <TfiBookmarkAlt />
                    <p>Feed</p>
                </div>
                <div className="sidebar-tag yellow">
                    <AiOutlineProfile />
                    <p>Profile</p>
                </div>
                <div className="sidebar-tag red">
                    <FiLogOut />
                    <p>Log Out</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
