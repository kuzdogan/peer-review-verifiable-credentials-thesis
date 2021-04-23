import moment from 'moment';
import React, { useContext } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import ReviewStatusBadge from './ReviewStatusBadge';

const WriteReviewButton = ({ onClick, reviewTaskId }) => (
  <Link className='' to={`reviews/write/${reviewTaskId}`}>
    <button
      onClick={onClick}
      type='button'
      className='py-2 px-4 flex justify-center items-center  w-full bg-green-600 hover:bg-green-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
    >
      <AiFillFileAdd className='mr-2' />
      Write Review
    </button>
  </Link>
);

const ReviewTaskCard = ({ reviewTask }) => {
  const { manuscript, reviewer, review } = reviewTask;
  const { user } = useContext(UserContext);
  console.log(user);
  console.log(reviewTask.reviewer);
  return (
    <div className='shadow-lg rounded-xl p-4 bg-white relative overflow-hidden m-4 min-w-full'>
      <div className='w-full'>
        <div className='mb-4 text-gray-500 text-sm'>Review Task</div>
        <p className='text-gray-800 text-xl font-medium mb-2'>{manuscript.title}</p>
        <p className='text-gray-800 text-md font-medium mb-2'>Reviewer: {reviewer.name}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>Deadline: {moment(reviewTask.deadline).format('DD MMMM YYYY')}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>id: {reviewTask.id}</p>
      </div>
      <div className='flex flex-wrap items-center gap-4 mt-6'>
        {review ? (
          <div className='flex'>
            {' '}
            <Link className='font-bold hover:underline flex items-center mr-2' to={`/reviews/${review.id}`}>
              <BiLinkExternal className='mr-2' /> Review submitted:
            </Link>{' '}
            {moment(review.completedDate).format('DD MMM YYYY')}
          </div>
        ) : (
          user.id === reviewTask.reviewer.id && <WriteReviewButton reviewTaskId={reviewTask.id} />
        )}
        <ReviewStatusBadge status={reviewTask.status} />
      </div>
    </div>
  );
};

export default ReviewTaskCard;
