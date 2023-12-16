import React from 'react';
import Login from '../Login';
import { Routes, Route } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-white text-black">
            <div className="font-bold text-xl">Securify Web</div>
            
            <ul className="flex space-x-4 justify-center flex-grow">
                {['Home', 'AboutUs', 'Services', 'Contact'].map((text) => (
                    <li key={text} className="hover:underline decoration-black decoration-2">
                        <a href={`#${text.toLowerCase()}`}>{text.replace(/([A-Z])/g, ' $1').trim()}</a>
                    </li>
                ))}
            </ul>

            {/* Placeholder button */}
            {/* <button href='http://localhost:3000/Login' className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                Dashboard
                <Routes>
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </button> */}
            <a href='http://localhost:3000/Login' className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">Dashboard</a>
        </nav>
    );
};

export default Navbar;
