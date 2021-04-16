import React, { useEffect, useState } from 'react';
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

  if (manuscripts.length === 0) {
    return "You don't have any manuscripts";
  }

  return (
    <div className='flex flex-wrap mx-8'>
      {manuscripts.map((manuscript) => (
        <ManuscriptCard manuscript={manuscript} key={manuscript.id} />
      ))}
    </div>
  );
};

export default ManuscriptsPage;
