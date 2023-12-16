// src/components/Footer.js
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear(); 

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="py-2 text-center md:text-left">
            <h3 className="text-lg font-bold">Securify Web</h3>
            <p className="text-sm">
              Providing top-notch security services since 2023.
            </p>
          </div>
          <div className="py-2">
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
              <li>
                <a href="/services" className="hover:text-blue-300 transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-300 transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-300 transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="py-2 text-sm text-center md:text-right">
            &copy; {year} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
