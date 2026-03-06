import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const infoMessage = location.state?.message || '';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await login(formData);
    if (result.success) {
      const role = (result.user?.role || 'USER').toLowerCase();
      navigate(`/${role}/dashboard`);
    } else {
      setError(result.error);
    }
    setSubmitting(false);
  };

  const handleDemoLogin = (role) => {
    const result = demoLogin(role);
    if (result.success) {
      navigate(`/${result.user.role.toLowerCase()}/dashboard`);
    }
  };

  return (
    <div className="auth-page login-container">
      <div className="auth-panel">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue managing healthcare appointments.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {infoMessage && <p className="success">{infoMessage}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <div className="demo-login">
          <p>Quick Demo Access</p>
          <div className="demo-actions">
            <button type="button" onClick={() => handleDemoLogin('USER')}>
              User
            </button>
            <button type="button" onClick={() => handleDemoLogin('DOCTOR')}>
              Doctor
            </button>
            <button type="button" onClick={() => handleDemoLogin('ADMIN')}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

