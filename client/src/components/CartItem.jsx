import React from 'react';

function CartItem({ CartItem, incHandle, decHandle, index, handledeletproductCart }) {
  return (
    <tr className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
      <td className="p-4 text-blue-900 font-medium">{index + 1}</td>
      <td className="p-4 text-blue-900 font-semibold">{CartItem.name}</td>
      <td className="p-4 text-blue-700 font-medium text-center">{CartItem.quantity}</td>
      <td className="p-4 text-blue-700 font-semibold">${(CartItem.price * CartItem.quantity).toFixed(2)}</td>
      <td className="p-4">
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={incHandle}
            className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors">
            +
          </button>
          <button
            onClick={decHandle}
            className="bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors">
            -
          </button>
        </div>
      </td>
      <td className="p-4 text-center">
        <button
          onClick={handledeletproductCart}
          className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21
          c.342.052.682.107 1.022.166m-1.022-.165L18.16
          19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25
          2.25 0 0 1-2.244-2.077L4.772 5.79m14.456
          0a48.108 48.108 0 0 0-3.478-.397m-12
          .562c.34-.059.68-.114 1.022-.165m0
          0a48.11 48.11 0 0 1 3.478-.397m7.5
          0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964
          51.964 0 0 0-3.32 0c-1.18.037-2.09
          1.022-2.09 2.201v.916m7.5 0a48.667
          48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
