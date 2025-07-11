// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user', // default role
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, address, password } = form;

    if (name.length < 20 || name.length > 60) {
      return 'Name must be between 20 and 60 characters.';
    }

    if (address.length > 400) {
      return 'Address must not exceed 400 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be 8–16 characters and include at least one uppercase letter and one special character.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationMessage = validateForm();
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      const errMsg = err.response?.data?.details || 'Registration failed.';
      setError(errMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="user">Normal User</option>
          <option value="admin">System Administrator</option>
          <option value="owner">Store Owner</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
