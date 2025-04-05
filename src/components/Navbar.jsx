import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../assets/logo1.png";
import useTheme from '../hooks/UseTheme';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dbUser, setDbUser] = useState({ name: "", photo: "" });
    const { theme, toggleTheme, isDark } = useTheme();
    // const [darkMode, setDarkMode] = useState(false);
    // const [theme,setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem("theme") : "light");

    // const handleToggle=(e)=>{
    //     if(e.target.checked){
    //         setTheme("dark");
    //     }  else {
    //         setTheme("light");
    //     }
    // };

    // useEffect(()=>{
    //     localStorage.setItem("theme" , theme);
    //     const localTheme = localStorage.getItem("theme");
    //     document.querySelector("html").setAttribute("class", localTheme);
    // },[theme]);


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
        <div className={`${theme==="dark" ? "" : ""}`}>
            <div className="navbar  shadow-sm "  >
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content  rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {lists}
                        </ul>
                    </div>
                    <div className='flex justify-center items-center '>
                        <img className='w-[100px]  ' src={logo} alt="Logo" />
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

<label className="btn btn-circle swap swap-rotate">
 
  <input type="checkbox" onChange={toggleTheme}  checked={isDark}/>

  {/* sun icon */}
  <svg
    className="swap-on h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

  {/* moon icon */}
  <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
  </svg>
</label>

                </div>
            </div>
        </div>
    );
};

export default Navbar;

