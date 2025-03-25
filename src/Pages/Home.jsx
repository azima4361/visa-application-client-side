import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const visas = useLoaderData();
    return (
        <div>
            <h1>home</h1>
        </div>
    );
};

export default Home;