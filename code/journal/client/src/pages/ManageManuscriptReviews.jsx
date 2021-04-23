import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiLinkExternal, BiSave } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import DropdownSelect from '../components/DropdownSelect';
import ManuscriptCard from '../components/ManuscriptCard';
import ManuscriptStatusBadge from '../components/ManuscriptStatusBadge';
import ReviewStatusBadge from '../components/ReviewStatusBadge';
import { readManuscript, updateManuscript } from '../services/manuscript.service';
import { createReviewTask, readReviewTask } from '../services/reviewTask.service';
import UserContext from '../UserContext';
import { manuscriptStatuses } from '../utils/consts';

const ManageManuscriptReviews = () => {
  const [manuscript, setManuscript] = useState();
  const [reviewTasksToAdd, setReviewTasksToAdd] = useState([]);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState();
  const { id } = useParams();
  const [reviewTasksPopulated, setReviewTasksPopulated] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!manuscript) {
      return;
    }
    if (user.role !== 'user') {
      const promises = manuscript.reviewTasks.map((reviewTask) => readReviewTask(reviewTask.id));
      Promise.all(promises).then((reviewTasks) => setReviewTasksPopulated(reviewTasks));
    }
  }, [manuscript]);
  const fetchAndSetManuscript = () => {
    readManuscript(id).then((data) => {
      setManuscript(data);
      setNewStatus(data.status);
    });
  };
  useEffect(() => {
    fetchAndSetManuscript();
  }, []);

  const handleSaveStatus = () => {
    updateManuscript(manuscript.id, { status: newStatus })
      .then(() => fetchAndSetManuscript())
      .then(() => setIsEditingStatus(false));
  };
  const handleChangeStatus = (e) => {
    setNewStatus(e.target.value);
  };
  const addReviewTask = () => {
    setReviewTasksToAdd([
      ...reviewTasksToAdd,
      { manuscript: manuscript.id, reviewer: '', deadline: new Date().setDate(new Date().getDate() + 1) },
    ]);
  };

  const handleRemoveReviewTask = (i) => {
    const temp = [...reviewTasksToAdd];
    temp.splice(i, 1);
    setReviewTasksToAdd(temp);
  };

  const handleChangeReviewer = (e, i) => {
    const temp = [...reviewTasksToAdd];
    temp[i].reviewer = e.target.value;
    setReviewTasksToAdd(temp);
  };

  const handleChangeDeadline = (date, i) => {
    const temp = [...reviewTasksToAdd];
    temp[i].deadline = date;
    setReviewTasksToAdd(temp);
  };

  const handleSubmit = () => {
    console.log(reviewTasksToAdd);
    const promises = reviewTasksToAdd.map((reviewTask) => createReviewTask(reviewTask));
    Promise.all(promises).then(() => window.location.reload());
  };

  if (!manuscript) return 'Loading';

  return (
    <div className='m-8 flex flex-1 flex-col'>
      <div className='text-xl font-bold mb-4'>{manuscript.title}</div>
      <div className='p-6 bg-white rounded-xl shadow-md mb-4'>
        <div>
          {' '}
          <span className='font-bold'>Manuscript status: </span>
          {isEditingStatus ? (
            <div>
              <DropdownSelect items={Object.values(manuscriptStatuses)} value={newStatus} onChange={handleChangeStatus} />
              <div className='flex'>
                <button
                  type='button'
                  onClick={() => setIsEditingStatus(false)}
                  className='py-2 px-4 text-red-600 hover:underline focus:outline-nonetransition ease-in duration-200 text-center text-base font-semibold rounded-lg focus:outline-none'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={handleSaveStatus}
                  className='py-2 px-4 flex justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  my-1'
                >
                  <BiSave className='mr-2' />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className='inline-block'>
              <span className='ml-2'>
                <ManuscriptStatusBadge status={manuscript.status} />
              </span>
              <span
                className='ml-2 cursor-pointer border-transparent hover:border-gray-800 border-b-2 p-0.5'
                onClick={() => setIsEditingStatus(true)}
              >
                <FiEdit className='inline-block' />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='p-6 bg-white rounded-xl shadow-md'>
        <div>
          <span className='text-lg font-bold'>Assigned Reviewers: </span>
        </div>
        <div className='my-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
          <table className='w-full table-auto divide-y divide-gray-200'>
            {reviewTasksPopulated && (
              <tr className='text-left uppercase bg-gray-100 text-gray-600'>
                <th className='py-3 px-6'>Name</th>
                <th className='py-3 px-6'>Task Id</th>
                <th className='py-3 px-6'>Deadline</th>
                <th className='py-3 px-6 text-center'>Status</th>
                <th className='text-center py-3 px-6'>Review Link</th>
              </tr>
            )}
            {reviewTasksPopulated &&
              reviewTasksPopulated.map((reviewTask, i) => (
                <tr>
                  {' '}
                  <td className='py-3 px-6'>{reviewTask.reviewer.name}</td>
                  <td className='py-3 px-6'>{reviewTask.id}</td>
                  <td className='py-3 px-6'>{moment(reviewTask.deadline).format('DD MMM YYYY')}</td>
                  <td className='py-3 px-6 text-center'>
                    <ReviewStatusBadge small status={reviewTask.status} />
                  </td>
                  <td className='py-3 px-6'>
                    {reviewTask.review && (
                      <Link
                        className='font-bold  hover:bg-white hover:text-black hover:underline flex items-center mr-2'
                        to={`/reviews/${reviewTask.review.id}`}
                      >
                        <BiLinkExternal className='m-auto' />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <div className='mt-8'>
          <span className='text-lg font-bold'>New Reviewers: </span>
        </div>
        <div>
          {reviewTasksToAdd.map((reviewTask, i) => (
            <ReviewTaskRow
              existingReviewTaskCount={manuscript.reviewTasks.length}
              reviewTask={reviewTask}
              i={i}
              key={`new-reviewtask-${i}`}
              handleChangeDeadline={handleChangeDeadline}
              handleChangeReviewer={handleChangeReviewer}
              handleRemoveReviewTask={handleRemoveReviewTask}
            />
          ))}
        </div>
        <div className='my-4 flex justify-between'>
          <button
            type='button'
            onClick={addReviewTask}
            className='py-2 px-4 text-green-600 hover:underline focus:outline-nonetransition ease-in duration-200 text-center text-base font-semibold rounded-lg focus:outline-none'
          >
            Add a Reviewer
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            className='py-2 px-4 my-2 bg-green-600 hover:bg-green-700 border-2 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ml-4'
          >
            Assign Reviewers
          </button>
        </div>
        <div />
      </div>
      <ManuscriptCard manuscript={manuscript} />
    </div>
  );
};

const isInFuture = (date) => date > new Date();

const ReviewTaskRow = ({
  reviewTask,
  i,
  handleChangeReviewer,
  handleChangeDeadline,
  handleRemoveReviewTask,
  existingReviewTaskCount,
  disabled,
}) => (
  <div className='flex flex-row my-4 items-end' key={`reviewTask-${i}`}>
    <div className='flex flex-col flex-1'>
      <div className='text-gray-700'>Reviewer {existingReviewTaskCount + i + 1}</div>
      <input
        type='text'
        onChange={(e) => handleChangeReviewer(e, i)}
        name='reviewer-input'
        className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mr-4 disabled:opacity-50'
        placeholder='Reviewer ID'
        disabled={disabled}
        value={reviewTask.reviewer}
      />
    </div>
    <div className='flex flex-col'>
      <div className='text-gray-700'>Deadline</div>
      <DatePicker
        dateFormat='dd MMMM yyyy'
        filterDate={isInFuture}
        className='rounded-lg border-transparent flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mr-4 disabled:opacity-50'
        selected={new Date(reviewTask.deadline)}
        disabled={disabled}
        onChange={(date) => handleChangeDeadline(date, i)}
      />
    </div>
    <button
      type='button'
      onClick={() => handleRemoveReviewTask(i)}
      className='py-2 px-2 flex justify-center items-center bg-red-500 hover:bg-red-600 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-11 h-11 rounded-lg disabled:hidden'
      disabled={disabled}
    >
      <FaTrash />
    </button>
  </div>
);

export default ManageManuscriptReviews;
