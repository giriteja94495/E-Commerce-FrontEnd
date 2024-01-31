"use client"
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = ({ cartItems }) => {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
    <div className='flex'>
    <div >
      <FaShoppingCart size={24} color="white" />
    </div>
    <div>
         {cartCount > 0 && (
        <span className="top-0 right-0 rounded-full text-white px-2 py-1 text-xs">
          {cartCount}
        </span>
      )}
    </div>
    </div>
 
    </>
  );
};

export default CartIcon;
