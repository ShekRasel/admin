import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSignIn from './pages/AdminSignIn';
import AdminSignUp from './pages/AdminSignUp';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // Check if the admin is authenticated
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(true); // Set to true for testing

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/signin" />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          {isAdminAuthenticated && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
