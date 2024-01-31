"use client"
import React, { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BASE_URL_ } from '@/utils/urls';

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    age: '',
    gender: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = Cookies.get('userId')
        // Make your API call here
        const response = await fetch(`${BASE_URL_}/users/${userID}`);
        const data = await response.json();

        // Update the state with data from the API
        setUserDetails({
          fullname: data.fullname,
          email: data.email,
          phonenumber: data.phonenumber,
          age: data.age,
          gender: data.gender,
        });
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, []); 
  
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Customize this section to make your API call with userDetails
    console.log('User Details:', userDetails);

    fetch(`${BASE_URL_}/users/${Cookies.get('userId')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then(response => {
        response.json();
    })
      .then(data => console.log('API Response:', data))
      .catch(error => console.error('API Error:', error));

 
  };

  return (
    <div className="flex items-center justify-center h-screen">
        <div className="">
            <img src="https://images.unsplash.com/photo-1564166174574-a9666f590437?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  />
        </div>
    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto relative z-10 shadow-md">
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">User Details</h2>
      <p className="leading-relaxed mb-5 text-gray-600">You can always edit your details(We are flexible to our customers)</p>
        <form onSubmit={onSubmitHandler}>
          <div className="relative mb-4">
            <label htmlFor="fullname" className="leading-7 text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={userDetails.fullname}
              onChange={onChangeHandler}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={onChangeHandler}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="phonenumber" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={userDetails.phonenumber}
              onChange={onChangeHandler}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="age" className="leading-7 text-sm text-gray-600">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={userDetails.age}
              onChange={onChangeHandler}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="gender" className="leading-7 text-sm text-gray-600">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={userDetails.gender}
              onChange={onChangeHandler}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
        </form>
        <p className="text-xs text-gray-500 mt-3">We know you have so much important things to do . Hence we take care of you with our services</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
