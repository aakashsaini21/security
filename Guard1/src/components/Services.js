// src/components/Services.js
import React from 'react';
import mobilePatrolImage from '../assets/mobile-patrol.jpeg'; // Replace with your image path
import eventSecurityImage from '../assets/event-security.jpeg'; // Replace with your image path
import personalSecurityImage from '../assets/personal-security.jpeg'; // Replace with your image path
import surveillanceImage from '../assets/surveillance.jpeg'; // Replace with your image path

const services = [
  {
    name: 'Mobile Guard Patrols',
    description: 'Agile and responsive security patrols equipped with the latest technology.',
    image: mobilePatrolImage,
  },
  {
    name: 'Event Security',
    description: 'Comprehensive security for events of any scale to ensure safety and order.',
    image: eventSecurityImage,
  },
  {
    name: 'Personalized Security Details',
    description: 'Custom security solutions tailored to individual needs.',
    image: personalSecurityImage,
  },
  {
    name: '24/7 Surveillance',
    description: 'Continuous surveillance services for unwavering security.',
    image: surveillanceImage,
  },
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">Our Security Services</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center">
            <img
              src={service.image}
              alt={service.name}
              className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
