import React from 'react';

const DropdownSelect = ({ value, items, onChange }) => (
  <select
    className='block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
    onChange={onChange}
    value={value}
  >
    {items.map((item) => (
      <option key={`dropdown-${item}`} value={item} className='capitalize'>
        {item}
      </option>
    ))}
  </select>
);

export default DropdownSelect;
