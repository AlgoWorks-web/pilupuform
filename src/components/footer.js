// Footer.js
import React from 'react';
import { FaInstagram, FaTiktok, FaPinterest, FaFacebookF, FaYoutube, FaTwitter } from 'react-icons/fa';
import PilupuLogo from '../assets/PilupuLogo.jpg';
import GooglePlayButton from '../assets/GooglePlayButton.png';
import AppStoreButton from '../assets/AppStoreButton.png';
const Footer = () => {
  return (
    <footer className="bg-white py-10 px-4 border-t text-gray-600">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Logo Section */}
        <div className="col-span-1 flex flex-col items-center">
          <img src={PilupuLogo} alt="Logo" className="mb-3" />
          <p className="text-black text-lg font-bold text-center">Pilupu</p>
        </div>
        
        {/* Links Section */}
        <div className="col-span-1">
          <h3 className="font-semibold text-black">HELP</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact us</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
            <li><a href="#" className="hover:underline">Return policy</a></li>
            <li><a href="#" className="hover:underline">Unsubscribe</a></li>
            <li><a href="#" className="hover:underline">Content Violation Form</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold text-black">COMPANY</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Promo codes</a></li>
            <li><a href="#" className="hover:underline">Personal design services</a></li>
            <li><a href="#" className="hover:underline">Party Shop</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-semibold text-black">LEARN</h3>
          <ul className="space-y-2 mt-2">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Online invitations</a></li>
            <li><a href="#" className="hover:underline">Designer collections</a></li>
            <li><a href="#" className="hover:underline">Product features</a></li>
            <li><a href="#" className="hover:underline">Apps</a></li>
          </ul>
        </div>

        {/* Social & App Store Links */}
        <div className="col-span-1">
          <h3 className="font-semibold text-black">CONNECT</h3>
          <div className="flex space-x-4 mt-4 text-gray-500 justify-center">
            <a href="#"><FaInstagram className="hover:text-gray-700" /></a>
            <a href="#"><FaFacebookF className="hover:text-gray-700" /></a>
            <a href="#"><FaYoutube className="hover:text-gray-700" /></a>
            <a href="#"><FaTwitter className="hover:text-gray-700" /></a>
          </div>
          <div className=" mt-5 flex flex-col items-center space-y-2">
            <a href="#" className=" w-40  "><img src={GooglePlayButton} alt="Google Play" className="mx-auto" /></a>
            <a href="#" className="w-36 h-20 "><img src={AppStoreButton} alt="App Store" className="mx-auto" /></a>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 text-center text-sm text-gray-500">
        © 2024 Pilupu ® | <a href="#" className="hover:underline">Terms & Privacy</a> | 
        <a href="#" className="hover:underline"> Privacy Snapshot</a> | 
        <a href="#" className="hover:underline">Cookie Policy</a> | 
        <a href="#" className="hover:underline">Accessibility Statement</a>
      </div>
    </footer>
  );
};

export default Footer;