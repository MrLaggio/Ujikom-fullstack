import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('You must be logged in to access this page');
    return <Navigate to="/FE_YAKA/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 