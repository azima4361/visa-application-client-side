import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import { updateProfile } from "firebase/auth";
import useTheme from '../hooks/UseTheme';

const Register = () => {
  const { theme } = useTheme();
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
      .catch(() => {
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
        updateProfile(user, { displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch(console.error);

        toast.success("User Registration Successful");

        fetch('https://visa-application-server-side.vercel.app/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name, email, photo })
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              // console.log('User saved to DB:', data);
            }
          });

        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        setError({ ...error, general: error.message });
        toast.error(`Registration failed: ${error.code}`);
      });
  };

  const getThemeClasses = () =>
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-600 focus:ring-yellow-500"
      : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400";

  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const dividerColor = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`flex justify-center items-center min-h-screen p-4 transition-all duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`w-full max-w-lg shadow-xl rounded-2xl p-8 space-y-6 transition-all duration-300 ${getThemeClasses()}`}>
        <h2 className={`text-3xl font-bold text-center ${theme === "dark" ? "text-yellow-400" : "text-blue-700"}`}>Create Account</h2>

        <button
          onClick={handleSignInGoogle}
          type="button"
          className={`w-full flex items-center justify-center gap-3 border rounded-lg py-2 font-medium hover:shadow-md transition ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'}`}
        >
          <FcGoogle className="text-2xl" /> Sign Up with Google
        </button>

        <div className={`divider text-sm ${dividerColor}`}>or register with email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block mb-1 font-medium ${labelColor}`}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${getThemeClasses()}`}
              required
            />
            {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
          </div>

          <div>
            <label className={`block mb-1 font-medium ${labelColor}`}>Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${getThemeClasses()}`}
              required
            />
          </div>

          <div>
            <label className={`block mb-1 font-medium ${labelColor}`}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${getThemeClasses()}`}
              required
            />
          </div>

          <div>
            <label className={`block mb-1 font-medium ${labelColor}`}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className={`w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${getThemeClasses()}`}
              required
            />
            {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
          </div>

          {error.general && <p className="text-red-600 text-sm text-center">{error.general}</p>}

          <button
            type="submit"
            className={`w-full font-semibold rounded-lg py-2 transition ${theme === "dark" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Register
          </button>
        </form>

        <p className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Already have an account?
          <Link to="/login" className={`font-medium ml-1 hover:underline ${theme === "dark" ? "text-yellow-400" : "text-blue-600"}`}>
            Login
          </Link>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
