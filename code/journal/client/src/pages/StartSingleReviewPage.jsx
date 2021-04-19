import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ManuscriptCard from '../components/ManuscriptCard';
import { assignReviewersToManuscript, readManuscript } from '../services/manuscript.service';

const StartSingleReviewPage = () => {
  const [manuscript, setManuscript] = useState();
  const [reviewersToAdd, setReviewersToAdd] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    readManuscript(id).then((data) => setManuscript(data));
  }, []);

  const addReviewer = () => {
    setReviewersToAdd([...reviewersToAdd, '']);
  };

  const handleRemoveReviewer = (i) => {
    const temp = [...reviewersToAdd];
    temp.splice(i, 1);
    setReviewersToAdd(temp);
  };

  const handleChangeReviewer = (e, i) => {
    const temp = [...reviewersToAdd];
    temp[i] = e.target.value;
    setReviewersToAdd(temp);
  };

  const handleSubmit = () => {
    assignReviewersToManuscript(manuscript, reviewersToAdd).then(() => {
      window.location.reload();
    });
  };

  const Reviewers = () =>
    manuscript.reviewers.length > 0 ? (
      manuscript.reviewers.map((reviewer) => <ReviewerBadge name={reviewer.name} key={reviewer.id} />)
    ) : (
      <span>No reviewers</span>
    );

  if (!manuscript) return 'Loading';

  return (
    <div className='m-8 flex flex-1 flex-col'>
      <div className='p-6 bg-white rounded-xl shadow-md'>
        <div>
          <span className='text-lg font-bold'>Reviewers: </span>
          <span>
            <Reviewers />
          </span>
        </div>
        <div>
          {reviewersToAdd.map((reviewer, i) => (
            <Input
              n={i + 1 + manuscript.reviewers.length}
              onRemove={() => handleRemoveReviewer(i)}
              key={`reviewer-input-${i}`}
              value={reviewer}
              onChange={(e) => handleChangeReviewer(e, i)}
            />
          ))}
        </div>
        <div className='my-4'>
          <button
            type='button'
            onClick={addReviewer}
            className='py-2 px-4 text-green-600 hover:underline focus:outline-nonetransition ease-in duration-200 text-center text-base font-semibold rounded-lg focus:outline-none'
          >
            Add a Reviewer
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            className='py-2 px-4 my-2 bg-green-600 hover:bg-green-700 border-2 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ml-4'
          >
            Save
          </button>
        </div>
        <div />
      </div>
      <ManuscriptCard manuscript={manuscript} />
    </div>
  );
};

const Input = ({ n, onChange, onRemove, value }) => (
  <div className='flex flex-col my-4'>
    <label htmlFor='reviewer-input' className='text-gray-700'>
      Reviewer {n}
    </label>
    <div className='flex flex-row'>
      <input
        type='text'
        onChange={onChange}
        name='reviewer-input'
        className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mr-4'
        placeholder='Reviewer ID'
        value={value}
      />

      <button
        type='button'
        onClick={onRemove}
        className='py-2 px-2 flex justify-center items-center bg-red-500 hover:bg-red-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-10 h-10 rounded-lg '
      >
        <FaTrash />
      </button>
    </div>
  </div>
);

const ReviewerBadge = ({ name, isEditing }) => (
  <span className='px-4 py-2 mx-2 text-base rounded-full text-white  bg-indigo-500 '>
    {name}
    {isEditing ? (
      <button className='bg-transparent hover'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='12'
          height='12'
          fill='currentColor'
          className='ml-4'
          viewBox='0 0 1792 1792'
        >
          <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z' />
        </svg>
      </button>
    ) : null}
  </span>
);

export default StartSingleReviewPage;
