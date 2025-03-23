import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
const Register = () => {
  const {createNewUser,setUser,signInWithGoogle} =useContext(AuthContext);
  const navigate = useNavigate();
  const [error,setError]= useState("");
 
  const regEx = /^(?=.*[a-z])(?=.*[A-Z]).*$/;

  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
         toast.success("Logged in with Google!");
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Google sign-in failed.");
      });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    const name= form.get("name");
    if(name.length<5){
      setError({...error,name: "must be more than 5 character long"});
      return;
    }
    const photo= form.get("photo");
    const email= form.get("email");
    const password= form.get("password");
    // console.log({name,email,photo,password})
    setError("");
   

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!regEx.test(password)) {
      setError("Password must have both uppercase and lowercase letters");
      return;
    }

    createNewUser(email,password).then((result)=>{
      const user = result.user;
      // console.log(user)
      setUser(user)
      toast.success("User Registration Successful");
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage)
      toast.error(`User Registration failed.${errorCode}`);
      // console.log(errorCode,errorMessage)
      // ..
    });
  }
   
    return (
      <div className="flex justify-center items-center min-h-screen p-4 bg-white">
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-2xl p-6">
        
        {/* Google Sign-In Button */}
        <div className="flex justify-center mb-4">
          <button onClick={handleSignInGoogle} type="button" className="btn w-full flex items-center gap-2">
            <FcGoogle className="w-7 h-7" /> Register with Google
          </button>
        </div>
    
        {/* Register Form */}
        <form onSubmit={handleSubmit} className="card-body p-0">
          <h3 className="text-center font-bold text-lg mb-4">Register Your Account</h3>
    
          {/* Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input name="name" type="text" placeholder="Enter your name" className="input input-bordered" required />
            {error.name && <label className="label text-red-500">{error.name}</label>}
          </div>
    
          {/* Photo URL Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" required />
          </div>
    
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input name="email" type="email" placeholder="Enter your email" className="input input-bordered" required />
          </div>
    
          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input name="password" type="password" placeholder="Enter your password" className="input input-bordered" required />
            {error && <p className="text-xs text-red-700">{error}</p>}
          </div>
    
          {/* Register Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Register</button>
          </div>
    
          {/* Login Redirect */}
          <p className="text-center mt-4">
            Already Have An Account? 
            <Link className="text-red-500 ml-1 hover:underline" to="/login">Login</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
    
    );
};

export default Register;