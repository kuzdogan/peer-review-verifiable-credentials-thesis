import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { readReview } from '../services/review.service';

const ViewReviewPage = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    readReview(reviewId).then((data) => setReview(data));
  }, []);

  if (!review) {
    return <div>Loading {reviewId}</div>;
  }
  return (
    <div>
      <ReviewCard review={review} />
    </div>
  );
};

export default ViewReviewPage;
