import React from 'react';
import ReviewAttribute from './ReviewAttribute';

const ReviewCheckboxAttribute = ({ label, value, checked, disabled, onChange }) => (
  <ReviewAttribute label={label} value={value}>
    <input
      type='checkbox'
      className={`${disabled ? 'text-gray-300' : 'text-lightBlue-500'} cursor-pointer mr-2 mt-1`}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  </ReviewAttribute>
);

export default ReviewCheckboxAttribute;
