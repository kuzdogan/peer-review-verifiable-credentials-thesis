import ReviewsTable from 'components/ReviewsTable';
import React from 'react';

const ReviewsList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <div>You have no reviews</div>;
  }
  return (
    <div>
      <ReviewsTable reviews={reviews} />
    </div>
  );
};

export default ReviewsList;
