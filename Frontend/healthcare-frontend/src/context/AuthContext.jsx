/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      return JSON.parse(userData);
    }
    return null;
  });
  const [loading] = useState(false);

  const login = async (credentials, role = 'PATIENT') => {
    try {
      const response = await apiLogin(credentials, role);
      const accessToken = response.accessToken || response.token;
      const refreshToken = response.refreshToken || null;
      const userData = {
        name: credentials.email?.split('@')?.[0] || 'User',
        email: credentials.email,
        role: response.role || role,
      };

      if (!accessToken) {
        return { success: false, error: 'Login response did not include access token' };
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        localStorage.removeItem('refreshToken');
      }
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      await apiRegister(userData);
      return { success: true, requiresLogin: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data || 'Registration failed',
      };
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
