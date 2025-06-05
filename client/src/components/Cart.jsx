import React from 'react';
import CartItem from './CartItem';
import '../App.css';
import { useNavigate } from 'react-router';

function Cart({ incHandler, decHandler, resetHandler, CartItems, handledeletproductCart }) {
  const navigate = useNavigate();
  // Calculate total price
  const totalPrice = CartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderClickHandler = () => {
    navigate('/menu');
  };
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {CartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Your cart is empty</h2>
            <p className="text-blue-600">Add some delicious items from our menu!</p>
            <button
              onClick={orderClickHandler}
              className="bg-blue-600 text-white px-8 py-3 my-5 rounded-lg text-lg font-semibold cursor-pointer hover:bg-blue-700">
              Add Now
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-blue-600 text-white p-4">
              <h3 className="text-xl font-bold">Cart Items</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="text-left p-4 text-blue-900 font-semibold">#</th>
                    <th className="text-left p-4 text-blue-900 font-semibold">Product</th>
                    <th className="text-center p-4 text-blue-900 font-semibold">Quantity</th>
                    <th className="text-left p-4 text-blue-900 font-semibold">Total</th>
                    <th className="text-center p-4 text-blue-900 font-semibold">Actions</th>
                    <th className="text-center p-4 text-blue-900 font-semibold">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {CartItems.map((element, index) => (
                    <CartItem
                      key={element.id}
                      index={index}
                      CartItem={element}
                      incHandle={() => incHandler(element)}
                      decHandle={() => decHandler(element)}
                      handledeletproductCart={() => handledeletproductCart(element)}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <div className="bg-blue-50 p-6 border-t border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-blue-900">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetHandler}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
