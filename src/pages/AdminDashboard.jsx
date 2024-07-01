import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdMessage, MdNotifications } from 'react-icons/md';
import { FaUsers, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { GrServices } from 'react-icons/gr';
import { BsPeopleFill } from 'react-icons/bs';
import { AiFillAppstore } from 'react-icons/ai';
import { RiUserAddFill, RiLoginBoxFill, RiUserSharedFill } from 'react-icons/ri';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar initially closed
  const [adminProfilePhoto, setAdminProfilePhoto] = useState(null); // Admin profile photo

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Check if the data is an array before setting it to state
        if (Array.isArray(usersResponse.data)) {
          setUsers(usersResponse.data);
        } else {
          console.error('Unexpected users response format:', usersResponse.data);
        }
  
        const adminResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminProfilePhoto(adminResponse.data.profilePhoto);
      } catch (error) {
        console.error('Error fetching users or admin profile:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const servicesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(services.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-200">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 fixed top-0 w-full z-10">
        <div className="flex items-center ml-16">
          <img src="/src/assets/logo.jpg" alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
          <span className="text-lg font-bold">Event Expert</span>
        </div>
        <div className="flex-grow flex justify-center mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-10/12 ml-8 px-2 py-[3px] text-sm rounded-md bg-gray-700 text-white outline-none"
          />
        </div>
        <div className="flex items-center gap-1">
          <MdMessage className="w-6 h-6 mr-2 cursor-pointer" />
          <MdNotifications className="w-6 h-6 mr-2 cursor-pointer" />
          {adminProfilePhoto ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${adminProfilePhoto}`}
              alt="Admin Profile"
              className="w-10 h-10 rounded-full cursor-pointer object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <RiUserAddFill className="w-10 h-10 rounded-full cursor-pointer" />
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${isSidebarOpen ? 'w-60' : 'w-20'} p-4 md:mt-2 fixed left-0 h-screen overflow-y-auto z-20 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-4 mt-14">
          <h2 className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin Dashboard</h2>
          <button onClick={toggleSidebar} className="focus:outline-none ml-2 md:ml-2">
            {isSidebarOpen ? <FaArrowAltCircleLeft /> : <FaArrowAltCircleRight />}
          </button>
        </div>
        <ul>
          <li className="mb-2 flex items-center hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
            <FaUsers className="mr-2" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Users</span>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
            <GrServices className="mr-2" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Services</span>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
            <Link to="/admin/signin" className="flex items-center w-full">
              <RiLoginBoxFill className="mr-2" />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Sign In</span>
            </Link>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
            <Link to="/admin/signup" className="flex items-center w-full">
              <RiUserAddFill className="mr-2" />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Sign Up</span>
            </Link>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-700 rounded-md px-2 py-1 cursor-pointer">
            <RiUserSharedFill className="mr-2" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>Sign Out</span>
          </li>
        </ul>
      </div>

      {/* Main Content and Additional Sections */}
      <div className={`flex flex-col ml-20 mt-12 flex-grow md:ml-${isSidebarOpen ? '60' : '20'} md:mt-12 md:ml-24 transition-all duration-300`}>
        {/* Users Section */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Users</h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b text-sm border-gray-300">Email</th>
                  <th className="border-b text-sm border-gray-300">First Name</th>
                  <th className="border-b text-sm border-gray-300">Last Name</th>
                  <th className="border-b text-sm border-gray-300">Profile Photo</th>
                  <th className="border-b text-sm border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100 text-sm">
                    <td className="border-b border-gray-300 text-sm text-center">{user.email}</td>
                    <td className="border-b border-gray-300 text-sm text-center">{user.firstName}</td>
                    <td className="border-b border-gray-300 text-sm text-center">{user.lastName}</td>
                    <td className="border-b border-gray-300 text-sm flex justify-center outline-none mt-3">
                      {user.profilePhoto ? (
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}/${user.profilePhoto}`}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <span>No Photo</span>
                      )}
                    </td>
                    <td className="p-2 border-b text-sm border-gray-300 text-center">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white text-[12px] text-bold px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Booked Services</h2>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border-b border-gray-300 text-sm">Service ID</th>
                  <th className="p-2 border-b border-gray-300 text-sm">Booked Service</th>
                  <th className="p-2 border-b border-gray-300 text-sm">Price</th>
                  <th className="p-2 border-b border-gray-300 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-100 text-sm">
                    <td className="border-b border-gray-300 text-sm text-center">{service._id}</td>
                    <td className="border-b border-gray-300 text-sm text-center">{service.name}</td>
                    <td className="border-b border-gray-300 text-sm text-center">{service.price}</td>
                    <td className="border-b border-gray-300 text-sm text-center">
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="flex flex-col md:flex-row md:ml-4 md:mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 md:w-96">
            <div className="flex items-center">
              <BsPeopleFill className="text-4xl text-blue-600 mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Tahoma, Roboto' }}>
                  Total Users
                </h2>
                <p className="text-2xl" style={{ fontFamily: 'Tahoma, Roboto' }}>
                  {users.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 md:w-96 md:ml-4">
            <div className="flex items-center">
              <AiFillAppstore className="text-4xl text-green-600 mr-4" />
              <div>
                <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Tahoma, Roboto' }}>
                  Total Added Services
                </h2>
                <p className="text-2xl" style={{ fontFamily: 'Tahoma, Roboto' }}>
                  {services.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 md:flex-1 md:ml-4">
            <h2 className="text-xl font-bold mb-4 text-center" style={{ fontFamily: 'Tahoma, Roboto' }}>
              Other Information
            </h2>
            {/* Add your content for the third section here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
