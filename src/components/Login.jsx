import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location)
  const {userLogin,setUser,signInWithGoogle}= useContext(AuthContext);
  const [error, setError] = useState({});
  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in with Google!");
        navigate(location?.state ? location.state : "/");
        localStorage.setItem("userEmail", user.email);
       
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Google sign-in failed.");
      });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    
    const email= form.get("email");
    const password= form.get("password");
    // console.log({email,password})
    userLogin(email,password)
    .then(result=>{
      const user= result.user;
      // console.log(user)
      setUser(user);
      toast.success("Logged in successfully!");
      navigate(location?.state ? location.state : "/" );
      localStorage.setItem("userEmail", user.email);
    })
    .catch((err) => {
      
      setError({...error,login:err.code})
      toast.error("Login failed. Please check your credentials.");
  })
}
    return (
      
      <div className='bg-white flex justify-center items-center min-h-screen p-4'>
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-2xl p-6">
        
        {/* Google Sign-In Button */}
        <div className='flex justify-center mb-4'>
          <button onClick={handleSignInGoogle} type="button" className="btn w-full flex items-center gap-2">
            <FcGoogle className="w-7 h-7" /> Login with Google
          </button>
        </div>
    
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="card-body p-0">
          <h3 className='text-center font-bold text-lg mb-4'>Login to your account</h3>
    
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name='email' type="email" placeholder="Enter your email" className="input input-bordered" required />
          </div>
    
          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input name='password' type="password" placeholder="Enter your password" className="input input-bordered" required />
            
            {/* Error Message */}
            {error.login && (
              <label className="label text-red-500">{error.login}</label>
            )}
    
            {/* Forgot Password */}
            <label className="label">
              <Link to={"/reset/password"} className="label-text-alt text-blue-500 hover:underline">Forgot password?</Link>
            </label>
          </div>
    
          {/* Login Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
    
          {/* Register Link */}
          <p className="text-center mt-4">
            Don’t Have An Account? 
            <Link className='text-red-500 ml-1 hover:underline' to="/register">Register</Link>
          </p>
        </form>
        
      </div>
      <ToastContainer />
    </div>
    
    );
};

export default Login;