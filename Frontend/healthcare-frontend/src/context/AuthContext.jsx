import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const parseJwtPayload = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const normalizeAuthResponse = (response, fallbackEmail) => {
  const accessToken = response?.accessToken || response?.token || response?.jwt || null;
  const refreshToken = response?.refreshToken || null;
  const user = response?.user || response?.data?.user || null;
  const jwtPayload = parseJwtPayload(accessToken);

  if (user) {
    return { accessToken, refreshToken, user };
  }

  return {
    accessToken,
    refreshToken,
    user: {
      id: response?.id || jwtPayload?.id || jwtPayload?.userId || jwtPayload?.sub || `user-${Date.now()}`,
      name: response?.name || jwtPayload?.name || jwtPayload?.username || fallbackEmail?.split('@')[0] || 'User',
      email: response?.email || jwtPayload?.email || fallbackEmail || '',
      role: (response?.role || jwtPayload?.role || 'USER').toUpperCase(),
    },
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveAuthState = (tokens, userData) => {
    if (tokens?.accessToken) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('token', tokens.accessToken);
    }
    if (tokens?.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      const normalized = normalizeAuthResponse(response, credentials?.email);
      saveAuthState(
        { accessToken: normalized.accessToken, refreshToken: normalized.refreshToken },
        normalized.user
      );
      return { success: true, user: normalized.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiRegister(userData);
      if (typeof response === 'string') {
        return { success: true, requiresLogin: true };
      }
      const normalized = normalizeAuthResponse(response, userData?.email);
      saveAuthState(
        { accessToken: normalized.accessToken, refreshToken: normalized.refreshToken },
        normalized.user
      );
      return { success: true, user: normalized.user };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const demoLogin = (role) => {
    const normalizedRole = (role || 'USER').toUpperCase();
    const demoUser = {
      id: `demo-${normalizedRole.toLowerCase()}`,
      name: `Demo ${normalizedRole.charAt(0)}${normalizedRole.slice(1).toLowerCase()}`,
      email: `demo.${normalizedRole.toLowerCase()}@example.com`,
      role: normalizedRole,
    };
    saveAuthState({ accessToken: 'demo-token' }, demoUser);
    return { success: true, user: demoUser };
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    demoLogin,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
