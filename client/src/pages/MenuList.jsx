import React from 'react';
import getArrayFromNumber from './../../utils/mathNumbers';

export default function MenuList({
  paginatedProducts,
  categories,
  selectedCategory,
  onCategoryChange,
  onToggleCartItem,
  numberOfPages,
  currentPage,
  onPageChange,
  cartItems,
}) {
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 font-medium
                      ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                      }
                    `}>
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-xl font-bold">Menu Items</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="text-left p-4 text-blue-900 font-semibold text-lg">Name</th>
                      <th className="text-left p-4 text-blue-900 font-semibold text-lg">Price</th>
                      <th className="text-center p-4 text-blue-900 font-semibold text-lg">Add to Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className={`border-b border-blue-100 hover:bg-blue-50 transition-colors
                          ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25'}
                        `}>
                        <td className="p-4 text-blue-900 font-medium text-lg">{product.name}</td>
                        <td className="p-4 text-blue-700 font-semibold text-lg">${product.price}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => onToggleCartItem(product)}
                            className={`p-2 rounded-full transition-all duration-200 hover:scale-110
                              ${
                                isInCart(product.id)
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }
                            `}>
                            <svg
                              className="w-6 h-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill={isInCart(product.id) ? 'currentColor' : 'none'}
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 
                                14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
                                2.1-4.684 2.924-7.138a60.114 60.114 0 0 
                                0-16.536-1.84M7.5 14.25 5.106 5.272M6 
                                20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 
                                0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {numberOfPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex space-x-2">
                {getArrayFromNumber(numberOfPages).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onPageChange(idx + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200
                      ${
                        currentPage === idx + 1
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }
                    `}>
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
