import React, { useState, useEffect } from 'react';

export default function CreateProduct({ categories, createAndupdateProduct, editingProduct, isEditMode }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    if (isEditMode && editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price || '',
        category: editingProduct.category || '',
      });
    } else {
      // Reset form for adding new product
      setFormData({
        name: '',
        price: '',
        category: '',
      });
    }
  }, [isEditMode, editingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    createAndupdateProduct(e);

    if (!isEditMode) {
      setFormData({
        name: '',
        price: '',
        category: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          {isEditMode ? 'Update Product' : 'Create New Product'}
        </h1>
        <div className="bg-blue rounded-xl shadow-lg p-4 border  border-blue-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label htmlFor="productName" className="block text-blue-900 font-semibold text-lg">
              Enter product Name
            </label>
            <input
              type="text"
              id="productName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 text-2xl text-blue-900 bold border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 placeholder-blue-400"
              required
            />

            <label className="block text-blue-900 font-semibold text-lg" htmlFor="productPrice">
              Enter Price
            </label>

            <input
              id="productPrice"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className="w-full px-4 py-3 text-2xl bold border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-blue-900 placeholder-blue-400"
              min="0"
              step="0.01"
              required
            />

            <label className="block text-blue-900 font-semibold text-lg" htmlFor="selectCatagor">
              Select Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 text-2xl bold border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-blue-900"
              required
              id="selectCatagor">
              {categories.map((element) => {
                if (element.id) {
                  return (
                    <option key={element.id} value={element.id} className="text-blue-900">
                      {element.name}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            <br />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
              {isEditMode ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
