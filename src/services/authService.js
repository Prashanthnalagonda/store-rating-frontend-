// src/services/authService.js
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

// ✅ Login
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API}/login`, credentials);

    // Save token & user to localStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    return res.data;
  } catch (err) {
    // Optional: Forward specific error message
    const message = err.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};

// ✅ Register
export const registerUser = async (userData) => {
  const res = await axios.post(`${API}/register`, userData);
  return res.data;
};

// ✅ Get Current User from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ✅ Logout
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ✅ Update Password (protected)
export const updatePassword = async (currentPassword, newPassword, token) => {
  const res = await axios.put(
    `${API}/update-password`,
    { currentPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
