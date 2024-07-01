import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Event Management System</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/admin/signin" className="font-bold hover:underline">Signin</Link>
          </li>
          <li>
            <Link to="/admin/signup" className="font-bold hover:underline">Signup</Link>
          </li>
          <li>
            <Link to="/admin/dashboard" className="font-bold hover:underline">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
