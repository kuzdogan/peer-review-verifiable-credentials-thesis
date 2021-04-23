import React from 'react';

const ManuscriptStatusBadge = ({ status }) => {
  switch (status) {
    case 'Pending':
      return <span className='px-4 py-2 ml-auto text-base rounded-full text-yellow-600  bg-yellow-200 '>Pending</span>;
    case 'In Review':
      return <span className='px-4 py-2 ml-auto text-base rounded-full text-blue-600  bg-blue-200 '>In Review</span>;
    case 'Minor Revision':
      return (
        <span className='px-4 py-2 ml-auto text-base rounded-full text-orange-500  bg-orange-200 '>Minor Revision Requested</span>
      );
    case 'Major Revision':
      return (
        <span className='px-4 py-2 ml-auto text-base rounded-full text-orange-700  bg-orange-200 '>Major Revision Requested</span>
      );
    case 'Accepted':
      return <span className='px-4 py-2 ml-auto text-base rounded-full text-green-600  bg-green-200 '>Accepted</span>;
    case 'Rejected':
      return <span className='px-4 py-2 ml-auto text-base rounded-full text-red-600  bg-red-200 '>Rejected</span>;
    default:
      return null;
  }
};

export default ManuscriptStatusBadge;
