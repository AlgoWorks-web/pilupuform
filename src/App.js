import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Services from './components/services';
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://housing.com/news/wp-content/uploads/2022/11/Designs-ideas-to-ease-your-mandap-decoration-at-home-compressed-686x400.jpg)' }}>
      
        {/* Content Container */}
        <div className="relative z-10 flex w-full max-w-7xl mx-auto p-8">
        
          {/* Left Section with Heading */}
          <div className="w-1/2 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold"></h1>
            </div>
          </div>
        
          {/* Form Section */}
          <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">VENDORS PROFILE</h2>
            <p className="text-gray-600 mb-6"></p>
            <form>
              {/* Full Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Full Name *</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your full name" />
              </div>

              {/* Phone Input */}
              <div className="flex space-x-4 mb-4">
                <div className="w-1/3">
                  <label className="block text-gray-700 font-medium">Code *</label>
                  <select className="w-full p-2 border border-gray-300 rounded mt-1">
                    <option>IN</option>
                  </select>
                </div>
                <div className="w-2/3">
                  <label className="block text-gray-700 font-medium">Phone *</label>
                  <input type="tel" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Phone" />
                </div>
              </div>

              {/* Categories Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Categories</label>
                <select className="w-full p-2 border border-gray-300 rounded mt-1">
                  <option>Choose Vendor Category</option>
                  <option>Photographer</option>
                  <option>Decoration</option>
                  <option>Gift Shops</option>
                  <option>Hotels</option>
                  <option>NGO</option>
                  <option>Musicians</option>
                  <option>Orchestra</option>
                </select>
              </div>

              {/* Shop Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Shop Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your Shop Name" />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Address</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter Your Address" />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Description</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter Description" />
              </div>

              {/* Experience and Website */}
              <div className="flex space-x-4 mb-4">
                <div className="w-1/3">
                  <label className="block text-gray-700 font-medium">Experience</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter Experience" />
                </div>
                <div className="w-2/3">
                  <label className="block text-gray-700 font-medium">Website Link (optional)</label>
                  <input type="url" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter Website Link" />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Services/>
      <Footer />
    </div>
  );
}

export default App;
