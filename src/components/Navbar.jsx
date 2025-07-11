import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:underline">Store Rating App</Link>
      </div>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/stores" className="hover:underline">Stores</Link>
            <Link to="/update-password" className="hover:underline">Update Password</Link>
            <button onClick={handleLogout} className="hover:underline text-red-300">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;