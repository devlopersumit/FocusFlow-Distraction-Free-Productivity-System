import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, error, clearError, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    try {
      const result = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      
      if (result.success) {
        // Small delay to ensure auth state is updated
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        setErrors({ general: result.error || 'Signup failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ general: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-4 px-4 sm:py-12 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-dark-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className={`mt-2 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold transition-colors duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create your FocusFlow account
          </h2>
          <p className={`mt-2 text-center text-sm transition-colors duration-200 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-colors duration-200 ${
                  errors.name ? 'border-red-300' : isDark ? 'border-dark-600 bg-dark-700 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-colors duration-200 ${
                  errors.email ? 'border-red-300' : isDark ? 'border-dark-600 bg-dark-700 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-colors duration-200 ${
                  errors.password ? 'border-red-300' : isDark ? 'border-dark-600 bg-dark-700 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium transition-colors duration-200 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-base sm:text-sm transition-colors duration-200 ${
                  errors.confirmPassword ? 'border-red-300' : isDark ? 'border-dark-600 bg-dark-700 text-white placeholder-gray-400' : 'border-gray-300 placeholder-gray-500 text-gray-900'
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {(error || errors.general) && (
            <div className={`rounded-md p-4 transition-colors duration-200 ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
              <div className={`text-sm transition-colors duration-200 ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                {error || errors.general}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation transition-colors duration-200"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
