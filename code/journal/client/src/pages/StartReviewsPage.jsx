import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManuscriptCard from '../components/ManuscriptCard';
import { readManuscripts } from '../services/manuscript.service';

const StartReviewsPage = () => {
  const [pendingManuscripts, setPendingManuscripts] = useState();

  useEffect(() => {
    readManuscripts({ status: 'Pending' }).then((data) => {
      setPendingManuscripts(data.results);
    });
  }, []);

  if (!pendingManuscripts) {
    return 'Loading';
  }
  return (
    <div className='flex flex-col ml-8'>
      <div className='text-lg font-bold my-4 ml-4'>Manuscripts Pending Review</div>
      {pendingManuscripts.map((manuscript) => {
        const { abstract, ...tempManuscript } = manuscript;
        return (
          <Link to={`/reviews/manage/startReview/${manuscript.id}`} className='w-full h-full block'>
            <ManuscriptCard manuscript={tempManuscript} />
          </Link>
        );
      })}
    </div>
  );
};

export default StartReviewsPage;
