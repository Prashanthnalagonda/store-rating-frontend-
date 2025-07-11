// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Optional: show a loading message if user is still being set
  if (user === null) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  // Redirect to login if no user
  if (!user || !user.role) {
    console.warn("🔒 Redirecting: no user or role found in context");
    return <Navigate to="/login" replace />;
  }

  // Role mismatch - Unauthorized access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(`❌ Unauthorized for role "${user.role}" → Allowed: ${allowedRoles}`);
    return <Navigate to="/unauthorized" replace />;
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
