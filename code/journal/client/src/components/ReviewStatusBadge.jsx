import React from 'react';

const ReviewStatusBadge = ({ status, small }) => {
  const baseStyle = small ? 'px-2 py-1 ml-auto text-sm' : 'px-4 py-2 ml-auto text-base';
  switch (status) {
    case 'Proposed':
      return <span className={`${baseStyle} rounded-full text-yellow-600  bg-yellow-200 `}> Proposed</span>;
    case 'Accepted & In Review':
      return <span className={`${baseStyle} text-base rounded-full text-blue-600  bg-blue-200 `}> In Review</span>;
    case 'Submitted':
      return <span className={`${baseStyle} rounded-full text-green-600  bg-green-200 `}> Submitted</span>;
    case 'Rejected':
      return <span className={`${baseStyle} rounded-full text-red-600  bg-red-200`}> Rejected</span>;
    default:
      return null;
  }
};

export default ReviewStatusBadge;
