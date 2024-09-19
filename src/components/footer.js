import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-200 py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Company Name in Flexbox */}
        <div className="flex items-center space-x-4">
          <img src="https://pilupubucket.s3.ap-south-1.amazonaws.com/logo.jpg" alt="Logo" className="h-36 w-36"/>
          <h2 className="text-lg font-bold">PILUPU</h2>
        </div>

      <div className=""></div>
       
        {/* Address */}
        <div>
          <h3 className="text-gray-500 font-semibold mb-2">Address</h3>
          <p>
          403, Banjara Hills Rd Number 1, Naveen Nagar, Banjara Hills, Hyderabad, Telangana 500004
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-400 font-semibold mb-2">Contact</h3>
          <p className="text-blue-500"><a href="tel:+91.......">+91 ........</a></p>
          <p className="text-blue-500"><a href="mailto:chakragroup.hyd@gmail.com">chakragroup.hyd@gmail.com</a></p>
          {/* <p className="text-blue-500"><a href="#feedback">Feedback Form</a></p> */}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-600">
        <p>&copy; 2021-2023 Pilupu. All Rights Reserved</p>
        <div className="mt-2">
          <a href="#privacy" className="text-purple-600 hover:underline mx-2">Privacy Policy</a>
          <a href="#terms" className="text-purple-600 hover:underline mx-2">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

