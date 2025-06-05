import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '../../utils/validtionRegstiration';
import { Link, useNavigate } from 'react-router';
import { useUser } from '../components/Navbar';


export default function Login() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useUser();

  const loginUserHandler = async (event) => {
    event.preventDefault();
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    let hasErrors = false;
    // Validate email format
    if (!isValidEmail(email)) {
      setEmailError('enter a valid email in the format example@exa.com');
      hasErrors = true;
    }
    // Validate password is not empty
    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters, with 1 digit, 1 uppercase,and 1 lowercase letter.');
      hasErrors = true;
    }
    // If there are validation errors, don't proceed
    if (hasErrors) {
      return;
    }

    setIsLoading(true);
    try {
      // JSON Server Auth login endpoint
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store the access token in localStorage (or wherever you prefer)
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        login(data.user, data.accessToken);
        // Redirect to home page
        navigate('/home');
      } else {
        // Login failed
        if (response.status === 400) {
          // Bad request - could be email or password error
          if (data.message && data.message.includes('email')) {
            setEmailError('Email not found in our system');
          } else if (data.message && data.message.includes('password')) {
            setPasswordError('Invalid password');
          } else {
            setEmailError('Invalid email or password');
          }
        } else {
          setEmailError('Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setEmailError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Sign in</h1>
          </div>

          {/* Login Form */}
          <form onSubmit={loginUserHandler} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 ${emailError
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                  : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your email"
              />
              {emailError && <span className="text-red-500 text-sm mt-1 block font-medium">{emailError}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-blue-900 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 ${passwordError
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                  : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="Enter your password"
              />
              {passwordError && <span className="text-red-500 text-sm mt-1 block font-medium">{passwordError}</span>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-3 px-4  cursor-pointer rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform shadow-lg ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98]'
                }`}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 cursor-pointer border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-blue-700">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-blue-800 hover:text-blue-900 hover:underline transition-colors duration-200">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
