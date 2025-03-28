import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../assets/logo2.jpg";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log('user data', user);

    const [dbUser, setDbUser] = useState({ name: "", photo: "" });

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setDbUser(data[0]); 
                    } else {
                        console.error("No user data found");
                    }
                })
                .catch(error => console.error("Error fetching user:", error));
        }
    }, [user]);

    const lists = (
        <>
            <Link to="/" className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0">Home</Link>
            <Link to="/all" className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0">All Visas</Link>
            {user?.email && (
                <>
                    <NavLink className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0" to='/add'>Add Visa</NavLink>
                    <NavLink className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0" to='/my-added-visa'>My Added Visa</NavLink>
                    <NavLink className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0" to='/applications'>My Applications</NavLink>
                </>
            )}
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {lists}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center '>
                        <img className='w-[100px] bg-white' src={logo} alt="Logo" />
                        <h2>Smart Visa</h2>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{lists}</ul>
                </div>

                <div className="navbar-end gap-5 ml-16 md:ml-0">
                    <div className="hidden md:flex gap-3">
                        {user?.email ? (
                            <div className='flex items-center gap-3'>
                                {dbUser.photo ? (
                                    <div className='relative group'>
                                        <img
                                            src={dbUser.photo}
                                            alt="User Profile"
                                            className='w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer'
                                        />
                                        <div className='absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded'>
                                            {dbUser.name}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                        {dbUser.name ? dbUser.name.charAt(0) : "U"}
                                    </div>
                                )}
                                {/* Logout Button */}
                                <button onClick={logOut} className="btn btn-neutral rounded-none">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex gap-3">
                                <Link to="/login" className="btn btn-neutral rounded-none">Login</Link>
                                <Link to="/register" className="btn">Register</Link>
                            </div>
                        )}
                    </div>

                   
                    <div className="flex flex-col md:hidden w-full gap-2 text-center">
                        {!user?.email ? (
                            <>
                                <Link to="/login" className="btn btn-sm btn-neutral w-full">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-primary w-full">Register</Link>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
