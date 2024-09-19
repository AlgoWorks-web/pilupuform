import React from 'react';

function Services() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Services you can offer</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQvqXAdI9JI_BYe95abKuauDta1xTCVj_lJw&s" 
              alt="Wedding Decor" 
              className="rounded-lg w-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Wedding Decor</h3>
            <p className="text-gray-600">From design consultation to flawless execution, we've got you covered!</p>
          </div>

          {/* Card 2 */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://images.pexels.com/photos/403495/pexels-photo-403495.jpeg?cs=srgb&dl=pexels-fonok-403495.jpg&fm=jpg" 
              alt=" Photographer" 
              className="rounded-lg w-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2"> Photographer</h3>
            <p className="text-gray-600">Capturing Moments, Creating Memories</p>
          </div>

          {/* Card 3 */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA_63E3LulKuMcGkN0OhvwWRHq51SUgtT0d6p1UF9zLql3C7mp1uOdOrtO88U4Mh5Kb1w&usqp=CAU" 
              alt="Orchestra" 
              className="rounded-lg w-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Orchestra</h3>
            <p className="text-gray-600"> Your Melodies, Our Passion.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-pink-50 p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://5.imimg.com/data5/SELLER/Default/2022/4/AH/PU/MH/46248806/catering-500x500.jpg" 
              alt="Catering" 
              className="rounded-lg w-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Catering</h3>
            <p className="text-gray-600"> Where Passion for Food Meets Exceptional Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
