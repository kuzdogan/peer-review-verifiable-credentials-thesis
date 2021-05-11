import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ReviewRecommendationBadge from '../components/ReviewRecommendationBadge';
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
    readReviews({ reviewer: user.id, populate: 'manuscript' }).then((data) => setDoneReviews(data.results));
  }, []);

  const doneReviewsTableRows =
    doneReviews &&
    doneReviews.map((review, i) => (
      <tr>
        <td className='py-4 px-4'>{review.manuscript.title}</td>
        <td className='py-4 px-4'>{moment(review.submissionDate).format('DD MMM YY')}</td>
        <td className='py-4 px-4 text-center whitespace-nowrap'>
          <ReviewRecommendationBadge recommendation={review.recommendation} />
        </td>
        <td className='py-4 px-4 text-center'>
          <Link className='text-center' key={`done-reviews-${i}`} to={`/reviews/${review.id}`}>
            <BiLinkExternal className='inline-block' />
          </Link>
        </td>
      </tr>
    ));

  return (
    <div className='flex flex-col flex-1 mx-8'>
      <div className='text-xl font-bold'>Assigned Reviews</div>
      {reviewTasks
        ? reviewTasks.map((reviewTask, i) => <ReviewTaskCard reviewTask={reviewTask} key={`review-task-${i}`} />)
        : 'Loading'}
      <div className='text-xl font-bold mt-8'>Reviews done by you</div>
      {doneReviews ? (
        <div className='my-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white'>
          <table className='text-left w-full table-auto divide-y divide-gray-200 break-words'>
            <thead className='whitespace-nowrap'>
              <tr>
                <th className='py-4 px-4'>Manuscript</th>
                <th className='py-4 px-4'>Submitted At</th>
                <th className='py-4 px-4 text-center'>Recommendation</th>
                <th className='py-4 px-4 text-center'>Review Link</th>
              </tr>
            </thead>
            <tbody>{doneReviewsTableRows}</tbody>
          </table>
        </div>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default ReviewsPage;
