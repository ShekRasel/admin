import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // State to hold the selected file
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Function to handle file input change
  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]); // Get the selected file
  };

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create FormData object to append data
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto); // Append profilePhoto if selected
    }

    try {
      // Send POST request with formData
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
        }
      });
      // Redirect to the dashboard page after successful signup
      navigate('/admin/dashboard');
    } catch (error) {
      // Handle error
      const errorMessage = error.response ? error.response.data.message : error.message;
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full h-full">
            <img src="/public/images/signupPic.avif" alt="SignUp" className="h-64 sm:h-96 md:h-[750px] w-full object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 text-center text-white bg-black bg-opacity-5 py-4">
              <p className="font-bold text-5xl">Join 35k+ web professionals &</p>
              <p className="font-bold text-5xl">build your website</p>
              <p className="text-2xl">Commercial License</p>
              <p className="text-2xl">Unlimited Exports</p>
              <p className="text-2xl">120+ Coded Blocks</p>
              <p className="text-2xl">Design Files Included</p>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Sign up</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSignUp} encType="multipart/form-data">
              <div className="mb-4">
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4">
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" required />
              </div>
              <div className="mb-4 relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" 
                  required 
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="mb-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 font-bold" 
                />
              </div>
              <button type="submit" className="w-full font-bold bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
