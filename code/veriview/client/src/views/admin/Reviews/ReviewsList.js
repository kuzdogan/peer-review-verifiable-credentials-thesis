import ReviewsTable from 'components/ReviewsTable';
import React from 'react';

const ReviewsList = ({ reviewProofs }) => {
  if (reviewProofs.length === 0) {
    return <div>You have no reviews</div>;
  }
  return (
    <div>
      <div className='rounded-t mb-0 px-4 py-3 border-0'>
        <div className='flex flex-wrap items-center'>
          <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
            <h3 className='font-semibold text-lg text-blueGray-70'>Shared Review Proofs</h3>
          </div>
        </div>
      </div>
      <ReviewsTable reviewProofs={reviewProofs} />
    </div>
  );
};

export default ReviewsList;
