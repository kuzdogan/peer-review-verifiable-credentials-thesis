import ReviewsTable from 'components/ReviewsTable';
import React from 'react';

const ReviewsList = ({ reviewProofs }) => {
  if (reviewProofs.length === 0) {
    return <div>You have no reviews</div>;
  }
  return (
    <div>
      <ReviewsTable reviewProofs={reviewProofs} />
    </div>
  );
};

export default ReviewsList;
