import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManuscriptCard from '../components/ManuscriptCard';
import { readOwnManuscripts } from '../services/manuscript.service';

const ManuscriptsPage = () => {
  const [manuscripts, setManuscripts] = useState(null);
  useEffect(() => {
    readOwnManuscripts().then((response) => setManuscripts(response.data.results));
  }, []);

  if (!manuscripts) {
    return 'Loading...';
  }

  return (
    <div className='flex mx-8 flex-col flex-1'>
      <div className='flex w-full justify-center'>
        <Link to='/manuscripts/submit'>
          <button
            type='button'
            className='py-2 px-4 justify-center items-center  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
          >
            + Submit Manuscript
          </button>
        </Link>
      </div>
      {manuscripts.length === 0 ? (
        <div className='flex flex-col flex-1 text-center justify-center'>
          <div>You don't have any manuscripts</div>
        </div>
      ) : (
        manuscripts.map((manuscript) => <ManuscriptCard manuscript={manuscript} key={manuscript.id} />)
      )}
    </div>
  );
};

export default ManuscriptsPage;
