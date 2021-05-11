import React, { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import DropdownSelect from '../components/DropdownSelect';
import { createReview } from '../services/review.service';

const WriteReviewPage = () => {
  const { reviewTaskId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  const [competingInterestStatement, setCompetingInterstStatement] = useState('');
  const [recommendation, setRecommendation] = useState('Accept');
  const history = useHistory();

  const handleRecommendationChange = (e) => {
    setRecommendation(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCompetingInterestStatement = (e) => {
    setCompetingInterstStatement(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview({ reviewTask: reviewTaskId, content, recommendation, title, competingInterestStatement }).then((review) =>
      history.push(`/reviews/${review.id}`)
    );
  };

  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col m-8 p-12'>
      <div className='text-lg font-bold'>Write review for the task {reviewTaskId}</div>
      <form className='mt-8' onSubmit={handleSubmit}>
        <div className='text-gray-800'>Title (optional)</div>
        <input
          type='text'
          id='review-form-title'
          onChange={handleTitleChange}
          className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          placeholder='Title'
          value={title}
        />

        <div className='text-gray-800 mt-4'>Content</div>
        <textarea
          id='review-form-content'
          // onChange={handleContentChange}
          className='mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          placeholder='Content'
          value={content}
          onChange={handleContentChange}
          rows='20'
          cols='40'
        />

        <div className='text-gray-800 mt-8'>Recommendation</div>
        <DropdownSelect
          value={recommendation}
          onChange={handleRecommendationChange}
          items={['Accept', 'Minor Revision', 'Major Revision', 'Reject']}
        />

        <div className='text-gray-800 mt-8'>Competing Interest Statement (optional)</div>
        <textarea
          id='review-form-content'
          // onChange={handleContentChange}
          className='mt-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          placeholder='Competing Interest Statement'
          value={competingInterestStatement}
          onChange={handleCompetingInterestStatement}
          rows='5'
          cols='40'
        />

        <button
          type='submit'
          className='py-2 px-4 mt-8 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
        >
          <FaFileUpload className='mr-2' />
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default WriteReviewPage;
