import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readReview } from '../services/review.service';

const ViewReviewPage = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState();

  useEffect(() => {
    readReview(reviewId).then((res) => setReview(res.data));
  }, []);

  if (!review) {
    return <div>Loading {reviewId}</div>;
  }
  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col m-8 p-12'>
      <div className='text-lg font-bold'>Review {reviewId}</div>
      <div className='mt-8'>
        <div className='text-gray-800 mt-8 font-bold'>Reviewer</div>
        <div>{review.reviewer}</div>
        <div className='text-gray-800 mt-8 font-bold'>Manuscript</div>
        <div>{review.manuscript}</div>
        <div className='text-gray-800 mt-8 font-bold'>Content</div>
        <div>{review.content}</div>

        <div className='text-gray-800 mt-8 font-bold'>Recommendation</div>
        <div>{review.recommendation}</div>
      </div>
    </div>
  );
};

export default ViewReviewPage;
