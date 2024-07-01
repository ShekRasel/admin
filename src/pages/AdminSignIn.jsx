import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/signin`, { email, password });
      const {token } = response.data;

      localStorage.setItem("token", token)
      console.log(response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <img src="/public/images/signupPic.avif" alt="SignIn" className="h-64 sm:h-96 md:h-[750px] w-full object-cover rounded-lg" />
        </div>
        <div className="sm:w-1/2 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-lg w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Sign In</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
