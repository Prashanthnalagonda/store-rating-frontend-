import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { updatePassword } from '../services/authService';

const PasswordUpdate = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(currentPassword, newPassword, user.token);
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update Password</h2>
      {message && <p className="mb-2 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border w-full mb-3 p-2"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full mb-3 p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;