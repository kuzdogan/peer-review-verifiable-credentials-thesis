// components
import React from 'react';

export default function Reviews() {
  return (
    <>
      <div className='flex flex-wrap mt-4 h-full items-center justify-center'>
        <button
          className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
        >
          Add a Review Credential
        </button>
        <div>You have no reviews</div>
      </div>
    </>
  );
}
