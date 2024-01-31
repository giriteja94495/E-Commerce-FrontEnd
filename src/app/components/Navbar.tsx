"use client"
import { Link } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartIcon from './cartIcon';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BASE_URL_ } from '@/utils/urls';

export const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const userId = Cookies.get('userId');

  useEffect(() => {
    if (userId) {
      checkCart(userId);
      setLoggedIn(true); 
    }
  }, [userId]);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('userId');
    if(!token) {
      toast.error("Session has expired please re login");
      router.push('/register');
    }
  }, []); 

  const checkCart = (userId) => {
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
  };

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('token');
    window.location.href = '/login';
  };

  return (
    <>
      <ToastContainer />
      <header className='bg-zinc-900 text-white'>
        <nav className='w-full py-4 md:w[80%]  flex items-center gap-x-3 justify-between'>
          <Link href={'/'}>Ecommerce App Qure AI </Link>
          <ul className='flex items-center gap-x-12 '>
            <li>
              <Link href={'/products'}>
                Home
              </Link>
            </li>
            {loggedIn && (
              <>
                <li>
                  <Link href={'/profile'}>
                    User Profile
                  </Link>
                </li>
                <li className=''>
                  <Link href={'/cart'}>
                    <CartIcon cartItems={cartItems} />
                  </Link>
                </li>

                <li>
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Logout
                  </a>
                </li>
              </>
            )}
            {!loggedIn && (
              <>
                <li>
                  <Link href={'/login'}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href={'/register'}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};
