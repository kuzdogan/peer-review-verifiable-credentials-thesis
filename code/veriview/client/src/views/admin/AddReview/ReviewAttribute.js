import React from 'react';

const ReviewAttribute = ({ label, value, children }) => (
  <div className='flex flex-wrap'>
    {children}
    <div className='md:w-1/6'>
      <b>{label}</b>
    </div>
    <div className='md:w-8/12 break-words'>{value}</div>
  </div>
);

export default ReviewAttribute;
