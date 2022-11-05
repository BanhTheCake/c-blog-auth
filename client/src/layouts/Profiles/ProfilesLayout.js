import React from 'react';
import Input from '../../components/Form/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './ProfilesLayout.scss';

const ProfilesLayout = () => {
    return (
        <div className="ProfilesLayout">
            <Navbar />
            <div className="container ProfilesLayout-content">
                <Sidebar />
                <div className="ProfilesLayout-main">
                    <div className="ProfilesLayout-main__blog">
                        <h4 className="ProfilesLayout-main__blog-title">
                            <div className="img-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                    alt=""
                                />
                            </div>
                            <p>2/22/2022</p>
                        </h4>
                        <div className="ProfilesLayout-main__blog-thumb">
                            <img
                                src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                alt=""
                            />
                        </div>
                        <div className="ProfilesLayout-main__blog-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Hic voluptatem nobis, explicabo minus a eius
                            qui sint! Repellendus accusamus suscipit,
                            architecto, recusandae ullam delectus possimus
                            nostrum corporis, sint dolores hic?
                        </div>
                    </div>
                    <div className="ProfilesLayout-main__user">
                        <div className="ProfilesLayout-main__user-ava">
                            <img
                                src="https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbWF0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                                alt=""
                            />
                        </div>
                        <form className='ProfilesLayout-main__user-form'>
                        <Input name={'name'} placeholder={'Name'} />
                        <Input name={'gmail'} placeholder={'Gmail'} />
                        <Input name={'password'} placeholder={'Password'} />
                        <Input
                            name={'cfPassword'}
                            placeholder={'Confirm password'}
                        />
                        <button className='btn-form'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilesLayout;
