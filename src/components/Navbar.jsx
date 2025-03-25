import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from "../assets/logo2.jpg";

const Navbar = () => {
    const {user,logOut}= useContext(AuthContext);
    const lists = (
        <>
          <Link to="/" className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0">Home</Link>
          <Link to="/all" className="lg:text-lg font-bold pr-4 pb-2 lg:pb-0">All visas</Link>
          <NavLink className={({isActive})=>`${user?.email ? "lg:text-lg font-bold pr-4 pb-2 lg:pb-0" : "hidden"}`} to='/add'>Add Visa</NavLink>
          <NavLink className={({isActive})=>`${user?.email ? "lg:text-lg font-bold pr-4 pb-2 lg:pb-0" : "hidden"}`} to='/my-added-visa'>My Added Visa</NavLink>
          <NavLink className={({isActive})=>`${user?.email ? "lg:text-lg font-bold pr-4 pb-2 lg:pb-0" : "hidden"}`} to='/applications'>My Application</NavLink>
         
        </>
      );
    return (
        <div>
           <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {lists}
      </ul>
    </div>
    <div className='flex justify-center items-center '>
      <img className='w-[100px] bg-white' src={logo} alt="" />
      <h2>Smart Visa</h2>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {lists}
    </ul>
  </div>

  <div className="navbar-end gap-5 ml-16 md:ml-0">
          <div className="hidden md:flex gap-3">
            {user?.email ? (
              <button onClick={logOut} className="btn btn-neutral rounded-none">
                LogOut
              </button>
            ) : (
              <Link to="/login" className="btn btn-neutral rounded-none">
                Login
              </Link>
            )}
            <Link to="/register" className="btn">Register</Link>
          </div>

          {/* Small Screen Buttons - Stacked */}
          <div className="flex flex-col md:hidden w-full gap-2 text-center">
            {user?.email ? (
              <button onClick={logOut} className="btn btn-sm btn-neutral w-full">
                LogOut
              </button>
            ) : (
              <Link to="/login" className="btn btn-sm btn-neutral w-full">
                Login
              </Link>
            )}
            <Link to="/register" className="btn btn-sm btn-primary w-full">
              Register
            </Link>
          </div>
        </div>
</div>
        </div>
    );
};

export default Navbar;