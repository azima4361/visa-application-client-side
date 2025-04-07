import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import useTheme from '../hooks/UseTheme';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useTheme();
  const [error, setError] = useState({ login: "" });

  const getThemeClasses = () =>
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-600 focus:ring-yellow-500"
      : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400";

  const labelColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const dividerColor = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const bgGradient = theme === "dark"
    ? "bg-gradient-to-br from-gray-900 to-gray-800"
    : "bg-gradient-to-br from-blue-50 to-indigo-100";

  const forgotTextColor = theme === "dark" ? "text-yellow-400" : "text-blue-600";
  const registerTextColor = theme === "dark" ? "text-yellow-400" : "text-blue-600";
  const submitBtnColor = theme === "dark"
    ? "bg-yellow-500 hover:bg-yellow-600"
    : "bg-blue-600 hover:bg-blue-700";

  const handleSignInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in with Google!");
        navigate(location?.state || "/");
        localStorage.setItem("userEmail", user.email);
      })
      .catch(() => {
        setError({ login: "Google sign-in failed." });
        toast.error("Google sign-in failed.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully!");
        navigate(location?.state || "/");
        localStorage.setItem("userEmail", user.email);

        const lastSignInTime = user?.metadata?.lastSignInTime;
        fetch('https://visa-application-server-side.vercel.app/users', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, lastSignInTime })
        }).catch(console.error);
      })
      .catch((err) => {
        setError({ login: err.message });
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div className={`flex justify-center items-center min-h-screen p-4 transition-all duration-300 ${bgGradient}`}>
      <div className={`w-full max-w-lg shadow-xl rounded-2xl p-8 space-y-6 transition-all duration-300 ${getThemeClasses()}`}>
        <h2 className={`text-3xl font-bold text-center ${theme === "dark" ? "text-yellow-400" : "text-blue-700"}`}>
          Login to Your Account
        </h2>

        <button
          onClick={handleSignInGoogle}
          type="button"
          className={`w-full flex items-center justify-center gap-3 border rounded-lg py-2 font-medium hover:shadow-md transition ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white'}`}
        >
          <FcGoogle className="text-2xl" /> Login with Google
        </button>

        <div className={`divider text-sm ${dividerColor}`}>or login with email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          </div>

          {error.login && <p className="text-red-500 text-sm text-center">{error.login}</p>}

          <div className="text-right">
            <Link to="/reset/password" className={`text-sm hover:underline ${forgotTextColor}`}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full text-white font-semibold rounded-lg py-2 transition ${submitBtnColor}`}
          >
            Login
          </button>
        </form>

        <p className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Don’t have an account?
          <Link to="/register" className={`font-medium ml-1 hover:underline ${registerTextColor}`}>
            Register
          </Link>
        </p>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
