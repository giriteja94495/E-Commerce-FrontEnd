"use client"
import Link from 'next/link'
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import Router   from 'next/router';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { BASE_URL_ } from '@/utils/urls';

const register = () => {
  
  const [state, setState] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    gender: "",
    age: "",
  });
  const router = useRouter()
  const [route, setRoute] = useState()

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  
  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);

    const requiredFields = ["email", "fullname", "password", "confirmPassword", "phonenumber", "age", "gender"];
    const emptyFields = requiredFields.filter(field => !state[field]);

    if (emptyFields.length > 0) {
      const errorMessage = `Please enter ${emptyFields.join(', ')} field(s)`;
      toast.error(errorMessage);
      return;
    }

    if (state.password !== state.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    try {
        const response = await axios.post(`${BASE_URL_}/users/`, state);
        toast.success('Registered Successfully');
        Cookies.set('userId',  response.data.id.toString(), { expires: 1 });
        router.push("http://localhost:3000/products")
      } catch (error) {
        toast.error('Registration Failed');
      }
    
  }


  return (
<section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
    <form onSubmit={onSubmitHandler} className="md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
      <div className="relative mb-4">
        <label htmlFor="fullname" className="leading-7 text-sm text-gray-600">Enter your Full Name</label>
        <input onChange={onChangeHandler}  value ={state.name}  type="text" id="fullname" name="fullname" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={onChangeHandler}  value ={state.email}  type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={onChangeHandler}  value ={state.password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
        <input onChange={onChangeHandler}  value ={state.confirmPassword} type="password" id="confirmPassword" name="confirmPassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="phonenumber" className="leading-7 text-sm text-gray-600">Enter Your Phone Number</label>
        <input onChange={onChangeHandler}  value ={state.phonenumber} type="text" maxLength={10} id="phonenumber" name="phonenumber" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="age" className="leading-7 text-sm text-gray-600">Age</label>
        <input onChange={onChangeHandler}  value ={state.age} type="text" maxLength={2} id="age" name="age" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
      <label htmlFor="gender" className="leading-7 text-sm text-gray-600">Gender</label>
      <div>
        <input onChange={onChangeHandler} value="male" type="radio" id="male" name="gender" className="mr-2" />
        <label htmlFor="male">Male</label>
      </div>
      <div>
        <input onChange={onChangeHandler} value="female" type="radio" id="female" name="gender" className="mr-2" />
        <label htmlFor="female">Female</label>
      </div>
      <div>
        <input onChange={onChangeHandler} value="other" type="radio" id="other" name="gender" className="mr-2" />
        <label htmlFor="other">Other</label>
      </div>

    </div>
      <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
      <p className="text-xs text-gray-500 mt-3">
        Already have an account ? <Link href={'\login'}>Login</Link>
        </p>
    </form>
  </div>
</section>
  )
}

export default register