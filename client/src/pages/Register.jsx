import React, { useState } from 'react';
import { isValidEmail, isValidPassword } from '../../utils/validtionRegstiration';
import { Link, useNavigate } from 'react-router';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const registerUserHandler = async (e) => {
        e.preventDefault();
        // Clear previous errors and messages
        setErrors({ name: '', email: '', password: '', confirmPassword: '' });
        setSuccessMessage('');

        const { name, email, password, confirmPassword } = formData;
        let hasErrors = false;
        let newErrors = {};

        // Validate name
        if (!name || name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            hasErrors = true;
        }
        // Validate email format
        if (!isValidEmail(email)) {
            newErrors.email = 'Enter a valid email in the format example@example.com';
            hasErrors = true;
        }
        // Validate password
        if (!isValidPassword(password)) {
            newErrors.password = 'Password must be at least 8 characters, with 1 digit, 1 uppercase, and 1 lowercase letter.';
            hasErrors = true;
        }
        // Validate password confirmation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            hasErrors = true;
        }

        // If there are validation errors, don't proceed
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }
        setIsLoading(true);

        try {
            // JSON Server Auth register endpoint
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, email: email, password: password, }),
            });

            const data = await response.json();

            if (response.ok) {
                // Registration successful
                setSuccessMessage('Account created successfully! You can now login.');

                // Store the access token in localStorage
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Clear the form
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });

                // Redirect to login or dashboard after a delay
                setTimeout(() => {
                    navigate('/home');
                }, 500);
            } else {
                // Registration failed
                if (response.status === 400) {
                    // Bad request - could be validation errors
                    if (data.message && data.message.includes('email')) {
                        setErrors((prev) => ({ ...prev, email: 'Email already exists in our system' }));
                    } else if (data.message && data.message.includes('password')) {
                        setErrors((prev) => ({ ...prev, password: 'Password does not meet requirements' }));
                    } else {
                        setErrors((prev) => ({ ...prev, email: data.message || 'Registration failed. Please try again.' }));
                    }
                } else {
                    setErrors((prev) => ({ ...prev, email: 'Registration failed. Please try again.' }));
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors((prev) => ({ ...prev, email: 'Network error. Please check your connection and try again.' }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 backdrop-blur-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Create New Account</h1>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg">{successMessage}</div>
                    )}

                    {/* Registration Form */}
                    <form className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text" name="name" id="name"
                                value={formData.name}
                                onChange={handleInputChange} required
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 bg-white ${errors.name
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                    : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.name}</span>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 bg-white ${errors.email
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                    : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-1 block font-medium">{errors.email}</span>}
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
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 bg-white ${errors.password
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                    : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Create a password"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm mt-1 block font-medium">{errors.password}</span>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-blue-900 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-gray-800 placeholder-blue-300 bg-white ${errors.confirmPassword
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                                    : 'border-blue-200 focus:border-blue-500 focus:ring-blue-100 hover:border-blue-300'
                                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm mt-1 block font-medium">{errors.confirmPassword}</span>
                            )}
                        </div>

                        {/* Register Button */}
                        <button
                            type="button"
                            onClick={registerUserHandler}
                            disabled={isLoading}
                            className={`w-full font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform shadow-lg ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl'
                                }`}>
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-blue-700">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-800 hover:text-blue-900 hover:underline transition-colors duration-200">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
