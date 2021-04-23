import moment from 'moment';
import React from 'react';
import ManuscriptStatusBadge from './ManuscriptStatusBadge';

const ManuscriptCard = ({ manuscript, actionButton, content, children }) => {
  const { title, submissionDate, abstract, author, id, status } = manuscript;

  return (
    <div className='shadow-lg rounded-xl p-8 bg-white relative overflow-hidden m-8'>
      <div className='w-full'>
        <p className='text-gray-800 text-xl font-medium mb-2'>{title}</p>
        <p className='text-gray-800 text-md font-medium mb-2'>Author: {author.name}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>Submitted At: {moment(submissionDate).format('DD MMMM YYYY')}</p>
        <p className='text-gray-400 text-xs font-medium mb-2'>id: {id}</p>
        {abstract && (
          <div>
            <div className='text-gray-800 text-md font-medium mb-2'>Abstract</div>
            <p className='text-gray-400 text-sm mb-4'>{abstract}</p>
          </div>
        )}
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <ManuscriptStatusBadge status={status} />
      </div>
      {content && (
        <div>
          <div className='text-gray-800 text-md font-medium mb-2'>Content</div>
          <p className='text-gray-700 text-sm mb-4'>{content}</p>
        </div>
      )}
      {children}
      <div className='flex flex-wrap flex-row-reverse items-center gap-4'>{actionButton}</div>
    </div>
  );
};
export default ManuscriptCard;
