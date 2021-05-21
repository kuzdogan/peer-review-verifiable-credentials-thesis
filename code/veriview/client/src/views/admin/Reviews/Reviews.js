// components
import React, { useContext, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { readReviewProofs } from 'services/reviewProof.service';
import { lightBlue } from 'tailwindcss/colors';
import UserContext from '../../../UserContext';
import ReviewsList from './ReviewsList';

export default function Reviews() {
  const { user } = useContext(UserContext);
  const [reviewProofs, setReviewProofs] = useState();

  useEffect(() => {
    readReviewProofs({ user: user._id }).then((res) => {
      setReviewProofs(res.results);
    });
  }, []);
  return (
    <>
      <div className='flex flex-col flex-wrap mt-4 h-full items-center justify-center'>
        <Link to='/reviews/add'>
          <button
            className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
          >
            Add a Review
          </button>
        </Link>
        {!reviewProofs ? (
          <Loader type='Circles' color={lightBlue['500']} height={100} />
        ) : (
          <ReviewsList reviewProofs={reviewProofs} />
        )}
      </div>
    </>
  );
}
