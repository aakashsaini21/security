// src/components/About.js
import React from 'react';
import softwareImage from '../assets/software-image.png'; // make sure to place an image in your src/assets directory

const featureList = [
  { name: 'Client Management', description: 'Keep track of client details and security history.' },
  { name: 'Guard Scheduling', description: 'Manage security personnel and scheduling.' },
  // Add more features as necessary
];

const About = () => {
  return (
    <div className="bg-white text-black py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">
          Intuitive Security Management Software
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
            <img src={softwareImage} alt="Security Software" className="rounded-lg shadow-lg" />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex flex-col justify-center h-full">
              {featureList.map((feature, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-2xl font-semibold">{feature.name}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
