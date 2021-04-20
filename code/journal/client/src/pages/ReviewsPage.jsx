import React, { useContext, useEffect, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ManuscriptCard from '../components/ManuscriptCard';
import ReviewCard from '../components/ReviewCard';
import { readManuscripts } from '../services/manuscript.service';
import { readReviews } from '../services/review.service';
import UserContext from '../UserContext';

const ReviewsPage = () => {
  const [assignedReviews, setAssignedReviews] = useState();
  const [doneReviews, setDoneReviews] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    readManuscripts({ reviewers: user.id, status: 'In Review' }).then((res) => setAssignedReviews(res.results));
    readReviews({ reviewer: user.id }).then((data) => setDoneReviews(data.results));
  }, []);
  return (
    <div className='flex flex-col flex-1 mx-8'>
      <div className='text-xl font-bold'>Assigned Reviews</div>
      {assignedReviews
        ? assignedReviews.map((manuscript, i) => (
          <ManuscriptCard
            key={`assigned-reviews-${i}`}
            manuscript={manuscript}
            actionButton={<WriteReviewButton manuscriptId={manuscript.id} />}
          />
        ))
        : 'Loading'}
      <div className='text-xl font-bold mt-8'>Reviews done by you</div>
      {doneReviews
        ? doneReviews.map((review, i) => (
          <Link to={`/reviews/${review.id}`} className='my-8 mx-4'>
            <ReviewCard key={`done-reviews-${i}`} review={{ content: `${review.content.substring(0, 50)}...`, ...review }} />
          </Link>
        ))
        : 'Loading'}
    </div>
  );
};

const WriteReviewButton = ({ onClick, manuscriptId }) => (
  <Link className='w-full' to={`reviews/write/${manuscriptId}`}>
    <button
      onClick={onClick}
      type='button'
      className='py-2 px-4 mt-4 flex justify-center items-center  w-full bg-green-600 hover:bg-green-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
    >
      <AiFillFileAdd className='mr-2' />
      Write Review
    </button>
  </Link>
);
export default ReviewsPage;
