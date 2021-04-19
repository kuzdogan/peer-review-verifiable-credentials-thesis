import moment from 'moment';
import React from 'react';

const ManuscriptCard = ({ manuscript }) => {
  const { title, submissionDate, abstract, author, id, status } = manuscript;

  const renderStatus = () => {
    switch (status) {
      case 'Pending':
        return <span className='px-4 py-2  text-base rounded-full text-yellow-600  bg-yellow-200 '>Pending</span>;
      case 'Minor Revision':
        return (
          <span className='px-4 py-2  text-base rounded-full text-orange-500  bg-orange-200 '>Minor Revision Requested</span>
        );
      case 'Major Revision':
        return (
          <span className='px-4 py-2  text-base rounded-full text-orange-700  bg-orange-200 '>Major Revision Requested</span>
        );
      case 'Accepted':
        return <span className='px-4 py-2  text-base rounded-full text-green-600  bg-green-200 '>Accepted</span>;
      case 'Rejected':
        return <span className='px-4 py-2  text-base rounded-full text-red-600  bg-red-200 '>Rejected</span>;
      default:
        return null;
    }
  };
  return (
    <div className='shadow-lg rounded-xl p-4 bg-white relative overflow-hidden m-4 min-w-full'>
      <div className='w-full'>
        <p className='text-gray-800 text-xl font-medium mb-2'>{title}</p>
        <p className='text-gray-800 text-md font-medium mb-2'>Author: {author.name}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>Submitted At: {moment(submissionDate).format('DD MMMM YYYY')}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>id: {id}</p>
        <p className='text-gray-400 text-sm mb-4'>{abstract}</p>
      </div>
      <div className='flex flex-wrap items-center gap-4'>{renderStatus(status)}</div>
    </div>
  );
};
export default ManuscriptCard;
