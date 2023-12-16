// src/components/Home.js
import React from 'react';
import heroImage from '../assets/hero-image.jpeg'; // make sure to place an image in your src/assets directory

const Home = () => {
  return (
    <div className="relative">
      <img src={heroImage} alt="Security in action" className="w-full h-auto" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to Securify Web
          </h1>
          <p className="text-xl text-white mb-8">
            Innovative Security at Your Fingertips
          </p>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
