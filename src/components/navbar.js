import React from 'react'

export default function navbar() {
  return (
    <div>
    <div className=" flex flex-col">
          {/* Navbar */}
          <nav className="bg-white p-4  px-32 flex justify-between items-center">
            <div className="flex items-center">
              {/* Logo */}
              <img
                src="https://pilupubucket.s3.ap-south-1.amazonaws.com/logo.jpg"
                alt="Logo"
                className="h-10 w-10 mr-3"
              />
              {/* Title */}
              <h1 className="text-black text-2xl font-bold">PILUPU</h1>
            </div>
            <div className="space-x-6">
              {/* Navigation Links */}
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
          </div></div>
  )
}




   
    