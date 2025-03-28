import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import { updateProfile } from "firebase/auth"; // ✅ Import updateProfile

const Register = () => {
  const { createNewUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState({ name: "", password: "", general: "" });

  const regEx = /^(?=.*[a-z])(?=.*[A-Z]).*$/;

  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in with Google!");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        setError({ ...error, general: "Google sign-in failed." });
        toast.error("Google sign-in failed.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    let errors = {};

    if (name.length < 5) {
      errors.name = "Name must be more than 5 characters long";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!regEx.test(password)) {
      errors.password = "Password must have both uppercase and lowercase letters";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({ name: "", password: "", general: "" });

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;

        // ✅ Update Firebase Profile with Name & Photo
        updateProfile(user, {
          displayName: name,
          photoURL: photo
        })
        .then(() => {
          setUser({ ...user, displayName: name, photoURL: photo }); // ✅ Update local state
        })
        .catch((err) => {
          console.error("Profile update error:", err);
        });

        toast.success("User Registration Successful");

        // ✅ Save user to database
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ name, email, photo })
        })
        .then(res => res.json())
        .then(data => {
          if (data.insertedId) {
            console.log('User saved to DB:', data);
          }
        });

        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError({ ...error, general: error.message });
        toast.error(`User Registration failed: ${error.code}`);
      });
  };

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
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
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
            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          </div>

          {/* General Error */}
          {error.general && <p className="text-red-500 text-sm text-center mt-2">{error.general}</p>}

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
