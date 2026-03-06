import React, { useState, useEffect } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Thermometer, Droplets, Wind, Zap, Plus, Settings, User, LayoutDashboard, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPatientAppointments } from '../../api/appointmentApi';
import { getDoctorAppointments } from '../../api/doctorApi';
import { getAllAppointments } from '../../api/appointmentApi';
import './FloatingDashboard.css';

const generateEcgData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    // Simulate ECG pattern: mostly flat, occasional spikes
    let val = 60 + Math.random() * 5;
    if (i % 10 === 0) val = 120 + Math.random() * 20; // R wave
    else if (i % 10 === 1) val = 40 + Math.random() * 10; // S wave
    else if (i % 10 === 8) val = 70 + Math.random() * 10; // P/T wave
    data.push({ time: i, value: val });
  }
  return data;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="fc-tooltip">
        <div className="fc-tooltip-label">Time: {payload[0].payload.time}s</div>
        <div className="fc-tooltip-value">{payload[0].value.toFixed(1)} bpm</div>
      </div>
    );
  }
  return null;
};

const FloatingDashboard = () => {
  const { user } = useAuth();
  const [ecgData, setEcgData] = useState(generateEcgData());
  const [appointments, setAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(true);

  // Derive initials for Avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEcgData(prev => {
        const newData = [...prev.slice(1)];
        let val = 60 + Math.random() * 5;
        const i = Date.now();
        if (i % 1000 < 100) val = 120 + Math.random() * 20;
        else if (i % 1000 < 200) val = 40 + Math.random() * 10;
        else if (i % 1000 > 800) val = 70 + Math.random() * 10;
        newData.push({ time: prev[prev.length - 1].time + 1, value: val });
        return newData;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoadingAppts(true);
        let data = [];
        if (user?.role === 'PATIENT') {
          data = await getPatientAppointments(user.email);
        } else if (user?.role === 'DOCTOR') {
          data = await getDoctorAppointments();
        } else if (user?.role === 'ADMIN') {
          data = await getAllAppointments();
        }
        setAppointments(data || []);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoadingAppts(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fallbackName = user?.name || 'Registered User';
  const roleDisplay = user?.role || 'Guest';
  const totalAppointments = appointments.length;

  return (
    <div className="fc-dashboard-container">
      {/* Sidebar */}
      <div className="fc-sidebar">
        <div className="fc-logo">
          <Zap size={32} />
        </div>
        <div className="fc-nav-item active"><LayoutDashboard size={24} /></div>
        <div className="fc-nav-item"><User size={24} /></div>
        <div className="fc-nav-item"><Activity size={24} /></div>
        <div className="fc-nav-item" style={{ marginTop: 'auto' }}><Settings size={24} /></div>
      </div>

      {/* Main Content */}
      <div className="fc-main-content">
        <div className="fc-header">
          <h1>Command Center</h1>
          <div className="fc-header-actions">
            <button className="fc-btn">
              <Plus size={18} /> New Patient
            </button>
            <button className="fc-btn" style={{ background: 'transparent', color: '#8892b0', borderColor: 'rgba(255,255,255,0.1)' }}>
              System Nominal <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00ffff', display: 'inline-block', marginLeft: 5 }}></span>
            </button>
          </div>
        </div>

        <div className="fc-bento-grid">
          {/* User Profile Card */}
          <div className="fc-glass-card card-patient-info">
            <div className="fc-card-title"><User size={16} /> User Profile</div>
            <div className="patient-profile">
              <div className="patient-avatar">{getInitials(user?.name)}</div>
              <div className="patient-details">
                <h3>{fallbackName}</h3>
                <p>Role: {roleDisplay} | {user?.email}</p>
              </div>
            </div>
            <div className="vitals-grid">
              <div className="vital-item">
                <span className="label">Total Appts</span>
                <span className="value">{loadingAppts ? '...' : totalAppointments}</span>
              </div>
              <div className="vital-item">
                <span className="label">Status</span>
                <span className="value" style={{ fontSize: '1.2rem', color: '#00ffff' }}>Active</span>
              </div>
              <div className="vital-item" style={{ gridColumn: 'span 2' }}>
                <span className="label">System Access</span>
                <span className="value" style={{ fontSize: '1rem' }}>{roleDisplay} Level</span>
              </div>
            </div>
          </div>

          {/* Primary Vitals Summary */}
          <div className="fc-glass-card card-vitals-primary">
            <div className="fc-card-title" style={{ justifyContent: 'space-between' }}>
              <span><Activity size={16} /> Critical Signs</span>
              <span className="fc-status-indicator status-normal">Stable</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', paddingBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginBottom: '5px' }}>Heart Rate</div>
                <div className="fc-value-large" style={{ color: '#00ffff' }}>72 <span className="fc-value-unit">bpm</span></div>
              </div>
              <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginBottom: '5px' }}>Blood Pressure</div>
                <div className="fc-value-large" style={{ color: '#fff' }}>120/80 <span className="fc-value-unit">mmHg</span></div>
              </div>
              <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8892b0', fontSize: '0.9rem', marginBottom: '5px' }}>SpO2</div>
                <div className="fc-value-large" style={{ color: '#8a2be2' }}>98 <span className="fc-value-unit">%</span></div>
              </div>
            </div>
          </div>

          {/* 3D Holographic Heart */}
          <div className="fc-glass-card card-3d-viz">
            <div className="hologram-container">
              <div className="heart-model">
                <div className="heart-layer layer-1"><Heart size={120} strokeWidth={1} /></div>
                <div className="heart-layer layer-2"><Heart size={120} strokeWidth={1.5} /></div>
                <div className="heart-layer layer-3"><Heart size={120} strokeWidth={0.5} /></div>
              </div>
              <div className="hologram-base"></div>

              <div style={{ position: 'absolute', top: 10, left: 10, fontSize: '0.7rem', color: '#00ffff', textTransform: 'uppercase', letterSpacing: 2 }}>
                [ AR Model Active ]
              </div>
              <div style={{ position: 'absolute', bottom: 10, right: 10, fontSize: '0.7rem', color: '#8a2be2', textTransform: 'uppercase', letterSpacing: 2 }}>
                Rhythm: Sinus
              </div>
            </div>
          </div>

          {/* ECG Chart Multi-span (Simulated) */}
          <div className="fc-glass-card card-chart-ecg">
            <div className="fc-card-title"><Activity size={16} /> Real-time Electrocardiogram (Simulated)</div>
            <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ecgData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEcg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00ffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#00ffff" strokeWidth={2} fillOpacity={1} fill="url(#colorEcg)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Stats (Dynamic/Simulated Mix) */}
          <div className="fc-glass-card card-blood">
            <div className="fc-card-title"><Calendar size={16} /> Appointments</div>
            <div className="fc-value-large" style={{ marginTop: '20px' }}>{loadingAppts ? '...' : appointments.length} <span className="fc-value-unit">total</span></div>
            <div style={{ marginTop: '15px', color: '#8892b0', fontSize: '0.8rem' }}>Lifetime records</div>
          </div>

          <div className="fc-glass-card card-resp">
            <div className="fc-card-title"><Wind size={16} /> Resp. Rate</div>
            <div className="fc-value-large" style={{ marginTop: '20px' }}>16 <span className="fc-value-unit">bpm</span></div>
            <div style={{ marginTop: '15px', color: '#00ffff', fontSize: '0.8rem' }}>[ Simulated ]</div>
          </div>

          <div className="fc-glass-card card-temp">
            <div className="fc-card-title"><Thermometer size={16} /> Body Temp</div>
            <div className="fc-value-large" style={{ marginTop: '20px' }}>37.1 <span className="fc-value-unit">°C</span></div>
            <div style={{ marginTop: '15px', color: '#ffa500', fontSize: '0.8rem' }}>[ Simulated ]</div>
          </div>

          {/* Quick Actions */}
          <div className="fc-glass-card card-quick-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="fc-card-title">Quick Actions</div>
            <button className="fc-btn" style={{ justifyContent: 'center', width: '100%' }}>Administer Meds</button>
            <button className="fc-btn" style={{ justifyContent: 'center', width: '100%', background: 'rgba(138,43,226,0.1)', borderColor: 'rgba(138,43,226,0.3)', color: '#8a2be2' }}>Request Labs</button>
            <button className="fc-btn" style={{ justifyContent: 'center', width: '100%', background: 'transparent', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>Export Record</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FloatingDashboard;
