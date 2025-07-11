import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const DashboardAdmin = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded text-center">
          <i className="bi bi-people-fill text-blue-600 text-3xl mb-2"></i>
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded text-center">
          <i className="bi bi-shop-window text-green-600 text-3xl mb-2"></i>
          <h2 className="text-lg font-semibold">Total Stores</h2>
          <p className="text-2xl">{stats.stores}</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded text-center">
          <i className="bi bi-star-fill text-yellow-500 text-3xl mb-2"></i>
          <h2 className="text-lg font-semibold">Total Ratings</h2>
          <p className="text-2xl">{stats.ratings}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
