import React, { useContext } from 'react';
import { FaFileSignature } from 'react-icons/fa';
import { issueCredential } from '../services/review.service';
import UserContext from '../UserContext';

const ReviewCard = ({ review }) => {
  const { user } = useContext(UserContext);

  const handleIssueCredential = () => {
    issueCredential(review.id).then((data) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        })
      );
      a.setAttribute('download', `${review.id}.json`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const IssueCreddentialButton = () => (
    <button
      type='button'
      className='py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
      onClick={handleIssueCredential}
    >
      <FaFileSignature className='mr-2' />
      Issue Credential
    </button>
  );
  return (
    <div className='bg-white rounded-lg shadow-lg flex flex-col p-12'>
      <div className='text-xl font-bold'>Review {review.id}</div>
      <div className='mt-4'>
        {review.reviewer.id === user.id && (
          <div>
            <IssueCreddentialButton />
          </div>
        )}
        <div className='text-gray-800 mt-4 font-bold'>Reviewer</div>
        <div>{review.reviewer.name}</div>
        <div className='text-gray-800 mt-4 font-bold'>Manuscript</div>
        <div>{review.manuscript.title}</div>
        {review.content && (
          <div>
            <div className='text-gray-800 mt-4 font-bold'>Content</div>
            <div>{review.content}</div>
          </div>
        )}

        <div className='text-gray-800 mt-4 font-bold'>Recommendation</div>
        <div>{review.recommendation}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
