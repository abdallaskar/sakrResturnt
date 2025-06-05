import React from 'react';

export default function Admin({ products, categories, deletProductHandler, addAndEditProduct }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Footer */}
        <div className="my-2 bg-white rounded-lg shadow-md  border border-blue-100 fixed  bottom-0 left-20">
          <h3 className="text-2xl font-semibold text-blue-900">Total Products : {products.length}</h3>
        </div>
        {/* Add Product Button */}
        <div className="fixed bottom-3 right-35">
          <button
            onClick={() => addAndEditProduct()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg shadow-lg transition-all duration-200 flex items-center gap-2 hover:shadow-xl transform hover:-translate-y-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white ">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {products.map((element, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-blue-900 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="text-blue-900 font-semibold text-lg">{element.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-blue-800 font-bold text-lg">${element.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">

                        {categories && element.category && categories[element.category]?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* Edit Button */}
                        <button
                          onClick={() => addAndEditProduct(element)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200 group"
                          title="Edit Product">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 group-hover:scale-110 transition-transform">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => deletProductHandler(element)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                          title="Delete Product">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 group-hover:scale-110 transition-transform">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-blue-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">No Products Yet</h3>
              <p className="text-blue-600">Add your first product to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
