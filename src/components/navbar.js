import React, { useState } from 'react';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-white p-4 flex items-center justify-between md:px-32">
        {/* Logo and Title */}
        <div className="flex items-center  flex-1 md:justify-start">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-black text-2xl font-bold">PILUPU</h1>
        </div>

        {/* Menu Button on the Right for Mobile */}
        <button onClick={toggleMenu} className="text-black md:hidden focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links for Laptop View */}
        <div className="hidden md:flex space-x-6">
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded">
            Home
          </button>
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded">
            About
          </button>
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded">
            Contact Us
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-md flex flex-col items-center p-4 md:hidden">
          {/* Center Logo and Title in Mobile View */}
          <div className="flex flex-col items-center mb-4">
            <img src={logo} alt="Logo" className="h-10 w-10 mb-2" />
            <h1 className="text-black text-2xl font-bold">PILUPU</h1>
          </div>
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded mb-2 w-full text-left">
            Home
          </button>
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded mb-2 w-full text-left">
            About
          </button>
          <button className="text-black hover:bg-blue-500 px-3 py-2 rounded w-full text-left">
            Contact Us
          </button>
        </div>
      )}
    </div>
  );
}
