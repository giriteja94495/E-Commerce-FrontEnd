"use client"
import React,{useState} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import ReactStars from 'react-stars'
// import { useRouter } from 'next/router';

const ProductItem = ({ category, title, description, image, id, likes,price, comments, addToCart,added,quantity,rating }) => {
 const onPointerMove = (value: number, index: number) => console.log(value, index)
  
    const handleAddToCart = () => {
        const userId = Cookies.get('userId');
        addToCart(id);  

        router.refresh()
      };

      const router = useRouter()

  const handleIncreaseQuantity = () => {
    // Implement logic to increase quantity
  };

  const handleDecreaseQuantity = () => {
    // Implement logic to decrease quantity
  };

  const handleShare = () => {
    const productLink = `${window.location.origin}/products/${id}`; 
    navigator.clipboard.writeText(productLink).then(() => {
      alert('Link copied to clipboard! , share it with any one you want.');
      router.push(`http://localhost:3000/products/${id}`)
    }).catch((error) => {
      console.error('Unable to copy link to clipboard', error);
    });
  };

    return (
        <div className="p-4 md:w-1/3">
          <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img className="lg:h-56 md:h-40 w-full object-cover object-center" src={image} alt={title} />
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{category}</h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
              <p className="leading-relaxed mb-3">{description}</p>
              <p className="text-green-600 font-bold mb-3">${price}</p>
              <div className="flex items-center flex-wrap">
                {added ? (
                  <>
                    <button
                      onClick={handleDecreaseQuantity}
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                    >
                      +
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                  >
                    Add to Cart
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                )}
     
              </div>
              <div className="title-font text-lg font-medium text-gray-900 mb-3">
              <button
              onClick={handleShare}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
            >
              Share
            </button>
              </div>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {likes}
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
                {comments}
              </span>
            </div>
            <div>
            <ReactStars 
            count={5} 
            size={24} 
            color2={'#ffd700'} /> 
            </div>
          </div>
        </div>
      );
};

export default ProductItem;
