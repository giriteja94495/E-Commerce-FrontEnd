"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './product';
import Cookies from 'js-cookie';
import { BASE_URL_ } from '@/utils/urls';
import  axiosInstance  from '@/utils/axios';

const ProductsPage = () => {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = Cookies.get('userId');

  // useEffect(() => {
  //   setLoading(true);
  //   const apiEndpoint = `${BASE_URL_}/products`;
  //   const userToken = Cookies.get('token');
  //   axios.get(apiEndpoint,{
  //     headers: {
  //       Authorization: `Token ${userToken}`,
  //     },
  //   })
  //     .then(response => {
  //       setProductData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching product data:', error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    setLoading(true);
    const apiEndpoint = `${BASE_URL_}/products`;
    const userToken = Cookies.get('token');

    axiosInstance.get(apiEndpoint)
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!loading && userId) {
      if (productData.length > 0) {
        checkCart(userId);
      }
    }
  }, [loading, userId]);

  useEffect(() => {
    if (userId && productData.length > 0) {
      const updatedProductData = productData.map(product => {
        const cartItem = cartItems.find(item => item.product_id === product.id);
        if (cartItem) {
          return {
            ...product,
            added: true,
            quantity: cartItem.quantity,
          };
        } else {
          return product;
        }
      });
      setProductData(updatedProductData);
    }
  }, [, cartItems]);

  const checkCart = (userId) => {
    const userToken = Cookies.get('token');
    const checkCartEndpoint = `${BASE_URL_}/checkCart/${userId}`;

    axios.get(checkCartEndpoint)
      .then(response => {
        setCartItems(response.data);
        console.log('Cart items:', response.data);
      })
      .catch(error => {
        console.log("lol")
        console.error('Error checking cart:', error);
      });

  };

  const handleAddToCart = (id) => {
    const userId =  Cookies.get('userId');
    const userToken = Cookies.get('token');

    fetch(`${BASE_URL_}/addToCart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "product_id": id,
        "userId": userId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
  }


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {productData.map((item) => (
            <ProductItem key={item.id} {...item}  addToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>



  );
};

export default ProductsPage;




