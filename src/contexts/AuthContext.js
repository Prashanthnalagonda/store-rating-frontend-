// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const userData = getCurrentUser();
    if (userData) setUser(userData);
  }, []);

  // ✅ LOGIN: Save to state + localStorage
  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUser(user);
  };

  // ✅ LOGOUT: Clear everything
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
