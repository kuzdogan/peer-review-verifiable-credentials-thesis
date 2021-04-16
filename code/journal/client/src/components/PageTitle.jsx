import React from 'react';
import { useLocation } from 'react-router';

const PageTitle = () => {
  const location = useLocation();

  return <div className='text-2xl my-12 ml-12 font-bold'>{location.pathname.slice(1).toUpperCase()}</div>;
};

export default PageTitle;
