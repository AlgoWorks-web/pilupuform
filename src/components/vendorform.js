import React, { useState } from 'react'; // Import useState
import axios from 'axios'; // Import axios

export default function VendorForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneCode: 'IN',
        phoneNumber: '',
        category: '',
        shopName: '',
        address: '',
        description: '',
        experience: '',
        websiteLink: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleImagesChange = (e) => {
        setUploadedImages([...e.target.files]);
    };

    const categoryMapping = {
        'Photographer': 1,
        'Decoration': 2,
        'Gift Shops': 3,
        'Hotels': 4,
        'NGO': 5,
        'Musicians': 6,
        'Orchestra': 7
    };
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('profilePicture', profilePicture);

        uploadedImages.forEach((image) => {
            formDataToSubmit.append('uploadedImages[]', image);
        });
        
        console.log("Selected Category:", formData.category);
        console.log("Mapped Vendor Type ID:", categoryMapping[formData.category]);
        const vendorTypeId = categoryMapping[formData.category];
        if (vendorTypeId === undefined) {
            console.error('Invalid category selected');
            alert('Please select a valid vendor category');
             return; // Prevent form submission
        }
        formDataToSubmit.append('vendor_type_id', vendorTypeId);

        //formDataToSubmit.append('vendor_type_id', categoryMapping[formData.category]);

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });

        console.log("Data to submit:", formDataToSubmit); // Log the form data
         // Log the entire FormData object
        for (let pair of formDataToSubmit.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
         }

         console.log("Data to submit:", formDataToSubmit); // Log the form data
        
         try {
            // const response = await axios.post('https://184.168.123.18:8443/vendor-details/add', formDataToSubmit, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            // const response = await axios.post('https://zingreel.in/add.php', formDataToSubmit, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            const response = await axios.post('http://localhost/add.php', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // const response = await axios.post('http://127.0.0.1:8081/api/vendor-details/add', formDataToSubmit, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            
            
            console.log('Vendor added:', response.data);
            alert('Vendor added successfully!');

            setFormData({
                fullName: '',
                phoneCode: 'IN',
                phoneNumber: '',
                category: '',
                shopName: '',
                address: '',
                description: '',
                experience: '',
                websiteLink: ''
            });
            setProfilePicture(null);
            setUploadedImages([]);
        } catch (error) {
            console.error('Error adding vendor:', error.response ? error.response.data : error.message);
            alert('Error adding vendor. Please try again.');
        }
        
    };

    return (
      <div>

        <div className="relative w-full h-64 bg-cover bg-center md:hidden"
                style={{
                    backgroundImage: 'url(https://housing.com/news/wp-content/uploads/2022/11/Designs-ideas-to-ease-your-mandap-decoration-at-home-compressed-686x400.jpg)',
                }}
            ></div>
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center lg:bg-[url('https://housing.com/news/wp-content/uploads/2022/11/Designs-ideas-to-ease-your-mandap-decoration-at-home-compressed-686x400.jpg')] bg-no-repeat">
            <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto p-4">
                {/* Left Section with Heading */}
                <div className="hidden lg:flex w-1/2 items-center">
                    <div className="text-white">
                        <h1 className="text-5xl font-bold">Vendors Profile</h1>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">VENDORS PROFILE</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Full Name *</label>
                            <input
                                name="fullName"
                                type="text"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/3">
                                <label className="block text-gray-700 font-medium">Code *</label>
                                <select name="phoneCode" value={formData.phoneCode}
                                    onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1">
                                    <option>IN</option>
                                </select>
                            </div>
                            <div className="w-2/3">
                                <label className="block text-gray-700 font-medium">Phone *</label>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Phone"
                                    required
                                />
                            </div>
                        </div>

                        {/* Categories Dropdown */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Categories</label>
                            <select name="category"
                                value={formData.category}
                                onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1">
                                <option value="">Choose Vendor Category</option>
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
                            <input
                                name="shopName"
                                type="text"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter your Shop Name"
                            />
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Address</label>
                            <input
                                name="address"
                                type="text"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter Your Address"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Description</label>
                            <input
                                name="description"
                                type="text"
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Enter Description"
                            />
                        </div>

                        {/* Experience and Website */}
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/3">
                                <label className="block text-gray-700 font-medium">Experience</label>
                                <input
                                    name="experience"
                                    type="text"
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter Experience"
                                />
                            </div>
                            <div className="w-2/3">
                                <label className="block text-gray-700 font-medium">Website Link (optional)</label>
                                <input
                                    name="websiteLink"
                                    type="url"
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    placeholder="Enter Website Link"
                                />
                            </div>
                        </div>

                        {/* Upload Profile Picture */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Upload Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                required
                            />
                        </div>

                        {/* Upload Your Images */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Upload Your Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
       
        </div>
    );
}
