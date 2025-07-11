// src/pages/DashboardUser.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">👤 Welcome, Normal User!</h1>
      <p className="mb-6 text-gray-700">
        You can browse all stores, submit ratings, and manage your account.
      </p>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={() => navigate('/stores')}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🏪 View Stores
        </button>

        <button
          onClick={() => navigate('/update-password')}
          className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition"
        >
          🔒 Update Password
        </button>
      </div>
    </div>
  );
};

export default DashboardUser;
