"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL_ } from '@/utils/urls';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = Cookies.get('userId');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckout = () => {
    openModal();
  };

  const handleConfirmCheckout = () => {
    closeModal();
    toast.success('Checked out successfully');
  };

  useEffect(() => {
    const userToken = Cookies.get('token');
    const checkCartEndpoint = `${BASE_URL_}/checkCart/${userId}`;

    axios
      .get(checkCartEndpoint)
      .then((response) => {
        setCartItems(response.data);
        console.log('Cart items:', response.data);
      })
      .catch((error) => {
        console.error('Error checking cart:', error);
      });
  }, [userId]);

  useEffect(() => {

    const apiEndpoint = `${BASE_URL_}/products`;
    const userToken = Cookies.get('token');

    axios
      .get(apiEndpoint,{
        headers: {
          Authorization: `Token ${userToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const renderCartItems = () => {
    let totalCartPrice = 0;
    const cartItemsContent = cartItems.map((cartItem) => {
        // Find the corresponding product for the cart item
        const product = products.find((product) => product.id === cartItem.product_id);
  
        if (product) {
          // Calculate individual item price
          const itemPrice = product.price * cartItem.quantity;
  
          // Add individual item price to total price
          totalCartPrice += itemPrice;
  
          return (
            <div key={cartItem.id} className="mb-4 p-4 border rounded-md">
              <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-md mb-2" />
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-800">Quantity: {cartItem.quantity}</p>
              <p className="text-green-600 font-bold">Price: ${itemPrice.toFixed(2)}</p>
              {/* Add any other product details you want to display */}
            </div>
          );
        }
  
        return null;
      });
  
      return { cartItemsContent, totalCartPrice };
  };


  const { cartItemsContent, totalCartPrice } = renderCartItems();
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <>
          {cartItemsContent}
          <p className="text-lg font-bold mb-4">Total Price: ${totalCartPrice.toFixed(2)}</p>
          <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
            Checkout
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal">
        <h2>Enter your address</h2>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <button onClick={handleConfirmCheckout}>Checkout</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    
      <ToastContainer />
    </div>
  );
};


export default CartPage;
