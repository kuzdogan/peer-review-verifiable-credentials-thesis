import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ManuscriptCard from '../components/ManuscriptCard';
import { readManuscript } from '../services/manuscript.service';

const ManuscriptViewPage = () => {
  const [manuscript, setManuscript] = useState();
  const { id } = useParams();

  useEffect(() => {
    readManuscript(id).then((data) => setManuscript(data));
  }, [manuscript]);

  if (!manuscript) {
    return 'Loading';
  }

  return (
    <div>
      <ManuscriptCard manuscript={manuscript} />
    </div>
  );
};

export default ManuscriptViewPage;
