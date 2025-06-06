import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link } from 'react-router';

// User Context
const UserContext = createContext();

// User Provider Component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// User Profile Dropdown Component
function UserProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            getInitials(user?.name || 'User')
          )}
        </div>
        <span className="text-slate-200 text-sm font-medium hidden sm:inline">
          {user?.name?.split(' ')[0] || 'User'}
        </span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown Content */}
          <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-xl shadow-2xl border border-slate-600 z-50 overflow-hidden">
            {/* User Info */}
            <div className="px-4 py-4 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    getInitials(user?.name || 'User')
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-100">{user?.name || 'User'}</p>
                  <p className="text-sm text-slate-300">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-emerald-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </Link>

              <Link
                to="/orders"
                className="flex items-center px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-emerald-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6h8v-6M8 11H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2" />
                </svg>
                My Orders
              </Link>

              <Link
                to="/favorites"
                className="flex items-center px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-emerald-400 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </Link>

              <hr className="my-2 border-slate-600" />

              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center px-4 py-3 text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Updated Navbar Component
export default function Navbar({ CartItems, handleSearchChange, searchQuery }) {
  const { user, isLoggedIn, logout } = useUser();

  const handleLogout = () => {
    logout();
    // Optionally redirect to home page after logout
    // window.location.href = '/home';
  };

  return (
    <nav className="bg-slate-900 shadow-xl sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-slate-100 text-2xl font-bold hover:text-emerald-400 transition-colors duration-200 tracking-wide flex items-center space-x-2">
              <span className="text-emerald-500">🍽️</span>
              <span>Sakr</span>
            </Link>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search delicious food..."
                className="w-full px-4 py-2.5 pl-12 pr-4 text-slate-200 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 placeholder-slate-400"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/home"
                className="px-4 py-2 text-slate-200 font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <span>🏠</span>
                <span>Home</span>
              </Link>

              <Link
                to="/about/company"
                className="px-4 py-2 text-slate-200 font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <span>ℹ️</span>
                <span>About</span>
              </Link>

              {/* Admin Link - Only show for logged in admin users */}
              {isLoggedIn && user?.isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 text-slate-200 font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Admin</span>
                </Link>
              )}

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative ml-2 px-4 py-2 text-slate-200 font-medium hover:bg-slate-800 hover:text-emerald-400 rounded transition-all duration-200 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="hidden sm:inline">Cart</span>
                {/* Cart Badge */}
                {CartItems.length > 0 && (
                  <span className="absolute -top-0 -right-0 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {CartItems.length}
                  </span>
                )}
              </Link>

              {/* Dynamic Auth Section */}
              {isLoggedIn ? (
                // Show user profile when logged in
                <UserProfileDropdown user={user} onLogout={handleLogout} />
              ) : (
                // Show login button when not logged in
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-800 text-slate-200 font-medium hover:bg-slate-700 hover:text-emerald-400 border border-slate-600 rounded-lg transition-all duration-200 flex items-center space-x-2">
                  <span>✍️</span>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search food..."
              className="w-full px-4 py-2.5 pl-12 pr-4 text-slate-200 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 placeholder-slate-400"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden pb-4">
          <div className="flex justify-center space-x-3">
            <Link
              to="/home"
              className="px-3 py-2 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200">
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200">
              About
            </Link>

            {/* Mobile Admin Link - Only show for logged in admin users */}
            {isLoggedIn && user?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-3 py-2 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200">
                Admin
              </Link>
            )}

            {/* Mobile Auth */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="px-3 py-2 text-slate-200 text-sm font-medium hover:bg-slate-800 hover:text-emerald-400 rounded-lg transition-all duration-200">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}