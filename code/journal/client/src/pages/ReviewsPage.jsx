import React, { useContext, useEffect, useState } from 'react';
import ManuscriptCard from '../components/ManuscriptCard';
import { readManuscripts } from '../services/manuscript.service';
import UserContext from '../UserContext';

const ReviewsPage = () => {
  const [assignedReviews, setAssignedReviews] = useState();
  const [doneReviews, setDoneReviews] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    readManuscripts({ reviewers: user.id, status: 'In Review' }).then((res) => setAssignedReviews(res.results));
  }, []);
  return (
    <div className='flex flex-col flex-1 mx-8'>
      <div className='text-lg font-bold'>Assigned Reviews</div>
      {assignedReviews
        ? assignedReviews.map((manuscript, i) => <ManuscriptCard key={`assigned-reviews-${i}`} manuscript={manuscript} />)
        : 'Loading'}
      <div className='text-lg font-bold'>Reviews done by you</div>
    </div>
  );
};

export default ReviewsPage;
