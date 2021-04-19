import React from 'react';
import { Link } from 'react-router-dom';

const ManageReviewsPage = () => (
  <div className='ml-8 mt-4 flex flex-col flex-1'>
    {/* Start Review Button */}
    <div className='flex justify-center'>
      <Link to='/reviews/manage/startReview'>
        <button
          type='button'
          className='py-2 px-4 justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
        >
          + Start a Review
        </button>
      </Link>
    </div>

    {/* Ongoing Reviews */}
    <hr className='my-8' />
    <section>
      <div className='text-lg font-bold'>Ongoing Reviews</div>
    </section>
  </div>
);

export default ManageReviewsPage;
