import React from 'react';

const ReviewRecommendationBadge = ({ recommendation, small }) => {
  const baseStyle = small ? 'px-2 py-1 ml-auto text-sm' : 'px-4 py-2 ml-auto text-base';
  switch (recommendation) {
    case 'Accept':
      return <span className={`${baseStyle} rounded-full text-green-600  bg-green-200 `}> Accept</span>;
    case 'Minor Revision':
      return <span className={`${baseStyle} text-base rounded-full text-yellow-600  bg-yellow-200 `}> Minor Revision</span>;
    case 'Major Revision':
      return <span className={`${baseStyle} rounded-full text-orange-600  bg-orange-200 `}> Major Revision</span>;
    case 'Reject':
      return <span className={`${baseStyle} rounded-full text-red-600  bg-red-200`}> Rejected</span>;
    default:
      return null;
  }
};

export default ReviewRecommendationBadge;
