import React from 'react';
import { Link, Outlet } from 'react-router';

export default function About() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Navigation</h3>
              <div className="space-y-2">
                <Link
                  to="company"
                  className="block p-3 rounded-lg text-blue-900 font-medium hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-300">
                  About Restaurant
                </Link>
                <Link
                  to="us"
                  className="block p-3 rounded-lg text-blue-900 font-medium hover:bg-blue-100 transition-colors border border-blue-200 hover:border-blue-300">
                  About Us
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">About Page</h2>
              <div className="text-blue-700">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
