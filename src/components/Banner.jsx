import React from 'react';
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.webp";
const Banner = () => {
    return (
        <div className="carousel w-full h-[500px] rounded-lg overflow-hidden">
            {/* Slide 1 */}
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src={slide1}
                    className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center p-5 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore the World</h2>
                    <p className="text-lg md:text-xl mb-4">Discover new places and experiences with us.</p>
                    <button className="btn btn-primary">Start Your Journey</button>
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>

           {/* Slide 2 */}
<div id="slide2" className="carousel-item relative w-full">
    <img
        src={slide2}
        className="w-full object-cover"
    />
    <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center p-5 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Hassle-Free Visa Services</h2>
        <p className="text-lg md:text-xl mb-4">Apply for your travel visa with ease and expert support.</p>
        <button className="btn btn-primary">Apply Now</button>
    </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" className="btn btn-circle">❮</a>
        <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
</div>


            {/* Slide 3 */}
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src={slide3}
                    className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center p-5 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Adventure Awaits</h2>
                    <p className="text-lg md:text-xl mb-4">Thrilling adventures are just a click away.</p>
                    <button className="btn btn-primary">Explore Tours</button>
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
            </div>

            {/* Slide 4 */}
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src={slide4}
                    className="w-full object-cover"
                />
                <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center p-5 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Book With Confidence</h2>
                    <p className="text-lg md:text-xl mb-4">Flexible plans, easy cancellations, 24/7 support.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
