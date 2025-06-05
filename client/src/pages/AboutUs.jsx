import React from 'react';

export default function AboutUs() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-600 pl-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">About Us</h1>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Our Story</h2>
        <p className="text-blue-700 text-lg leading-relaxed mb-4">
          Welcome to our About Us page. We are passionate about serving delicious, high-quality meals that bring people
          together around the table.
        </p>
        <p className="text-blue-700 text-lg leading-relaxed mb-4">
          Our journey began with a simple vision: to create a restaurant where every guest feels like family and every
          meal is prepared with love and care.
        </p>
        <p className="text-blue-700 text-lg leading-relaxed">
          Thank you for visiting our About Us page and for being part of our story.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-blue-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Mission</h3>
          <p className="text-blue-700">
            To provide exceptional dining experiences with fresh ingredients and outstanding service.
          </p>
        </div>
        <div className="bg-white border border-blue-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Our Values</h3>
          <p className="text-blue-700">
            Quality, freshness, and customer satisfaction are at the heart of everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}
