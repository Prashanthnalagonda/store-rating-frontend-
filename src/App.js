// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardUser from './pages/DashboardUser';
import DashboardOwner from './pages/DashboardOwner';
import StoreList from './pages/StoreList';
import PasswordUpdate from './pages/PasswordUpdate';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-Based Protected Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <DashboardOwner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stores"
          element={
            <ProtectedRoute allowedRoles={['admin', 'user', 'owner']}>
              <StoreList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <PasswordUpdate />
            </ProtectedRoute>
          }
        />

        {/* Fallback Unauthorized Route */}
        <Route
          path="/unauthorized"
          element={
            <div className="text-center mt-10 text-red-600 text-xl font-semibold">
              🚫 Unauthorized Access — You don’t have permission to view this page.
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
