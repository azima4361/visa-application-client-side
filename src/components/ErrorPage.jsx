import React from 'react';
import errorImg from '../assets/error.png'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div>
            <img src={errorImg} alt="" />
            <Link to='/'>
            <button className='btn'>Return to home</button></Link>
        </div>
    );
};

export default ErrorPage;