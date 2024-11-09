import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// This component will check if a user is authenticated (i.e., token exists in localStorage)
const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  
  // If there is no token, redirect to the login page
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // If token exists, render the child components (AdminDashboard)
  return <Outlet />;
};

export default PrivateRoute;
