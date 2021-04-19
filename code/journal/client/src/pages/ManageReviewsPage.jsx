import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManuscriptCard from '../components/ManuscriptCard';
import { readManuscripts } from '../services/manuscript.service';

const ManageReviewsPage = () => {
  const [manuscriptsBeingReviewed, setManuscriptsBeingReviewed] = useState();
  useEffect(() => {
    readManuscripts({ status: 'In Review' }).then((res) => {
      setManuscriptsBeingReviewed(res.results);
    });
  }, []);
  return (
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
      <section className=' flex flex-1 flex-col'>
        <div className='text-lg font-bold'>Ongoing Reviews</div>
        {manuscriptsBeingReviewed ? (
          <ManuscriptsBeingReviewed manuscripts={manuscriptsBeingReviewed} />
        ) : (
          <div className='flex flex-1 align-middle justify-center'>
            <div> Loading</div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageReviewsPage;

const ManuscriptsBeingReviewed = ({ manuscripts }) => {
  if (manuscripts.length === 0) {
    return (
      <div className='flex flex-1 items-center justify-center'>
        <div> No ongoing reviews </div>
      </div>
    );
  }
  return manuscripts.map((manuscript, i) => <ManuscriptCard manuscript={manuscript} key={`manuscript-in-review${i}`} />);
};
