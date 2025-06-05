import React from 'react';

export default function AboutRestaurant() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-600 pl-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">About Restaurant</h1>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">Sakr Restaurant</h2>
        <p className="text-blue-700 text-lg leading-relaxed mb-4">
          Welcome to Sakr Restaurant, where culinary excellence meets warm hospitality. Our restaurant has been serving
          the community with pride and dedication.
        </p>
        <p className="text-blue-700 text-lg leading-relaxed mb-4">
          We specialize in a diverse menu featuring burgers, chicken, rice dishes, fresh salads, and delightful
          desserts. Every dish is prepared with the finest ingredients and attention to detail.
        </p>
        <p className="text-blue-700 text-lg leading-relaxed">
          Thank you for choosing Sakr Restaurant. We look forward to serving you!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border border-blue-200 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">🍔</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">Fresh Food</h3>
          <p className="text-blue-700 text-sm">Made with the freshest ingredients daily</p>
        </div>
        <div className="bg-white border border-blue-200 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">Fast Service</h3>
          <p className="text-blue-700 text-sm">Quick preparation and delivery</p>
        </div>
        <div className="bg-white border border-blue-200 p-4 rounded-lg text-center">
          <div className="text-2xl mb-2">❤️</div>
          <h3 className="text-lg font-semibold text-blue-900 mb-1">Made with Love</h3>
          <p className="text-blue-700 text-sm">Every meal prepared with care</p>
        </div>
      </div>
    </div>
  );
}
