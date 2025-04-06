import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../components/Banner';
import LatestVisa from '../components/LatestVisa';
import useTheme from '../hooks/UseTheme';
import VisaSuccessStories from '../components/VisaSuccessStories';
import VisaRecommend from '../components/VisaRecommend';

const Home = () => {
    const visas = useLoaderData();
    const {theme}= useTheme();
    return (

        <div className={`${theme==="dark" ? "bg-black text-white" : ""}`}>
          
            <Banner></Banner>

            <LatestVisa></LatestVisa>

            <VisaSuccessStories></VisaSuccessStories>

            <VisaRecommend></VisaRecommend>
        </div>
    );
};

export default Home;