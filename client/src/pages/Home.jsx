import React from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  const categories = [
    { name: 'Burgers', id: '1' },
    { name: 'Waters', id: '2' },
    { name: 'Fries', id: '3' },
    { name: 'Chicken', id: '4' },
    { name: 'Meat', id: '5' },
    { name: 'Rice', id: '6' },
    { name: 'Drinks', id: '7' },
    { name: 'Ice Cream', id: '8' },
    { name: 'Salads', id: '9' },
    { name: 'Sides & Desserts', id: '10' },
  ];

  const orderClickHandler = () => {
    navigate('/menu');
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Sakr Restaurant</h1>
        <p className="text-xl">Welcome to our delicious meals</p>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Food Categories</h2>
          <p className="text-blue-600 text-lg">Choose from our variety of delicious meals</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 cursor-pointer border-2 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900">{category.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={orderClickHandler}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold cursor-pointer hover:bg-blue-700">
            Order Now
          </button>
        </div>
      </main>
    </div>
  );
}
