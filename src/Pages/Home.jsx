import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../components/Banner';
import LatestVisa from '../components/LatestVisa';

const Home = () => {
    const visas = useLoaderData();
    return (
        <div>
            <h1>home</h1>
            <Banner></Banner>

            <LatestVisa></LatestVisa>
        </div>
    );
};

export default Home;