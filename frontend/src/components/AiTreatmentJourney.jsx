import React from 'react';
import { useAppStore } from '../store/appStore';
import { getTheme } from '../utils/theme';

export default function AiTreatmentJourney() {
  const { darkMode } = useAppStore();
  const th = getTheme(darkMode);

  const steps = [
    'Symptoms',
    'Suggested Department',
    'Suggested Tests',
    'Nearby Hospitals',
    'Book Appointment',
    'Medicine Reminder',
    'Recovery Tracking'
  ];

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 24px',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        7. 🧠 AI Treatment Journey <span style={{ color: '#fbbf24', fontSize: '20px' }}>⭐⭐⭐⭐⭐</span>
      </h2>

      {/* Subtext */}
      <p style={{
        fontSize: '16px',
        marginBottom: '16px',
        color: '#e2e8f0',
        fontWeight: 500
      }}>
        AI shows
      </p>

      {/* Main Card */}
      <div style={{
        backgroundColor: '#232323',
        borderRadius: '16px',
        padding: '32px',
        position: 'relative',
        marginBottom: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        {/* Copy Icon */}
        <button style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: '#9ca3af',
          cursor: 'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>

        {/* List of Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                fontSize: '15px',
                color: '#f8fafc',
                fontWeight: 500
              }}>
                {step}
              </div>
              {idx < steps.length - 1 && (
                <div style={{ color: '#9ca3af', fontSize: '14px', marginLeft: '4px' }}>
                  ↓
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div style={{
        fontSize: '18px',
        lineHeight: 1.6
      }}>
        <div style={{ color: '#e2e8f0' }}>Like Google Maps</div>
        <div style={{ color: '#fff', fontWeight: 'bold' }}>but for healthcare.</div>
      </div>
    </div>
  );
}
