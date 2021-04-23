import React, { useContext, useEffect, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import ReviewTaskCard from '../components/ReviewTaskCard';
import { readReviews } from '../services/review.service';
import { readReviewTasks } from '../services/reviewTask.service';
import UserContext from '../UserContext';

const ReviewsPage = () => {
  const [reviewTasks, setReviewTasks] = useState();
  const [doneReviews, setDoneReviews] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    readReviewTasks({ reviewer: user.id, populate: 'review,reviewer,manuscript' }).then((res) => setReviewTasks(res.results));
    readReviews({ reviewer: user.id }).then((data) => setDoneReviews(data.results));
  }, []);
  return (
    <div className='flex flex-col flex-1 mx-8'>
      <div className='text-xl font-bold'>Assigned Reviews</div>
      {reviewTasks
        ? reviewTasks.map((reviewTask, i) => <ReviewTaskCard reviewTask={reviewTask} key={`review-task-${i}`} />)
        : 'Loading'}
      <div className='text-xl font-bold mt-8'>Reviews done by you</div>
      {doneReviews
        ? doneReviews.map((review, i) => (
          <Link key={`done-reviews-${i}`} to={`/reviews/${review.id}`} className='my-8 mx-4'>
            <ReviewCard review={{ content: `${review.content.substring(0, 50)}...`, ...review }} />
          </Link>
        ))
        : 'Loading'}
    </div>
  );
};

export default ReviewsPage;
