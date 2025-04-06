import React from 'react';
import errorImg from '../assets/error.png';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 text-center px-4">
      <img
        src={errorImg}
        alt="Page not found"
        className="w-full max-w-min mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
