import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { user, token } = await loginUser(form);
      login(user, token); // Set in context + localStorage

      // ✅ Redirect based on role
      if (user.role === 'admin') navigate('/dashboard/admin');
      else if (user.role === 'owner') navigate('/dashboard/owner');
      else navigate('/dashboard/user');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
