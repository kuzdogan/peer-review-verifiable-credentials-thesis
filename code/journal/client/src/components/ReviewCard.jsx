import React from 'react';

const ReviewCard = ({ review }) => (
  <div className='bg-white rounded-lg shadow-lg flex flex-col p-12'>
    <div className='text-xl font-bold'>Review {review.id}</div>
    <div className='mt-4'>
      <div className='text-gray-800 mt-4 font-bold'>Reviewer</div>
      <div>{review.reviewer}</div>
      <div className='text-gray-800 mt-4 font-bold'>Manuscript</div>
      <div>{review.manuscript}</div>
      {review.content && (
        <div>
          <div className='text-gray-800 mt-4 font-bold'>Content</div>
          <div>{review.content}</div>
        </div>
      )}

      <div className='text-gray-800 mt-4 font-bold'>Recommendation</div>
      <div>{review.recommendation}</div>
    </div>
  </div>
);

export default ReviewCard;
