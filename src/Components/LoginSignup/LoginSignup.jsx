import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [action, setAction] = useState('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (action === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (action === 'signup' && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (action === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (action === 'signup' && !agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms & Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (action === 'login') {
        navigate('/dashboard');
      } else {
        setAction('login');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setAgreeToTerms(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // Switch between login and signup
  const toggleAction = () => {
    setAction(action === 'login' ? 'signup' : 'login');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setAgreeToTerms(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      margin: '20px auto',
      width: '100%',
      maxWidth: '420px',
      background: '#fff',
      padding: '48px 40px',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #0077ffff 0%, #01a365ff 100%)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>S</span>
        </div>
      </div>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          {action === 'login' ? 'Smart Expense Management' : 'Create Account'}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          {action === 'login' ? 'Sign in to your SEMS account' : 'Join SEMS to manage your expenses'}
        </p>
      </div>
      {/* Form */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Name field (only for signup) */}
        {action === 'signup' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label style={{
              marginBottom: '6px',
              color: '#374151',
              fontWeight: '500',
              fontSize: '14px'
            }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                height: '48px',
                background: '#f9fafb',
                border: `1px solid ${errors.name ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '8px',
                color: '#111827',
                fontSize: '14px',
                padding: '0 16px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</span>}
          </div>
        )}
        {/* Email field */}
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label style={{
            marginBottom: '6px',
            color: '#374151',
            fontWeight: '500',
            fontSize: '14px'
          }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              height: '48px',
              background: '#f9fafb',
              border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '8px',
              color: '#111827',
              fontSize: '14px',
              padding: '0 16px',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</span>}
        </div>
        {/* Password field */}
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <label style={{
            marginBottom: '6px',
            color: '#374151',
            fontWeight: '500',
            fontSize: '14px'
          }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            style={{
              width: '100%',
              height: '48px',
              background: '#f9fafb',
              border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '8px',
              color: '#111827',
              fontSize: '14px',
              padding: '0 16px',
              transition: 'all 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.password && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.password}</span>}
        </div>
        {/* Confirm Password field (only for signup) */}
        {action === 'signup' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column'
          }}>
            <label style={{
              marginBottom: '6px',
              color: '#374151',
              fontWeight: '500',
              fontSize: '14px'
            }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              style={{
                width: '100%',
                height: '48px',
                background: '#f9fafb',
                border: `1px solid ${errors.confirmPassword ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '8px',
                color: '#111827',
                fontSize: '14px',
                padding: '0 16px',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.confirmPassword && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</span>}
          </div>
        )}
        {/* Terms checkbox (only for signup) */}
        {action === 'signup' && (
          <div style={{ marginTop: '8px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#374151',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => {
                  setAgreeToTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors(prev => ({
                      ...prev,
                      terms: ''
                    }));
                  }
                }}
                style={{
                  marginRight: '8px',
                  accentColor: '#6366f1'
                }}
              />
              I agree to the <span style={{ color: '#6366f1', textDecoration: 'underline' }}>Terms & Privacy Policy</span>
            </label>
            {errors.terms && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errors.terms}</div>}
          </div>
        )}
        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            height: '48px',
            background: loading ? '#9ca3af' : '#6366f1',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {loading ? (
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          ) : (
            action === 'login' ? 'Login' : 'Create Account'
          )}
        </button>
        {errors.general && (
          <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}
      </div>
      {/* Footer links */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        {action === 'login' && (
          <button style={{
            background: 'none',
            border: 'none',
            color: '#6366f1',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '16px',
            textDecoration: 'underline'
          }}>
            Forgot Password?
          </button>
        )}
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          {action === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={toggleAction}
            style={{
              background: 'none',
              border: 'none',
              color: '#6366f1',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            {action === 'login' ? 'Create Account' : 'Login'}
          </button>
        </div>
      </div>
      {/* CSS animation for loading spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginSignup;