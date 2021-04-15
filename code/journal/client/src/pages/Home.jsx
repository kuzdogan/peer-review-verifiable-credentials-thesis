import React, { useEffect } from 'react';

const Home = () => {
  // const [content, setContent] = useState('');

  useEffect(() => {
    console.log('Welcome home');
  }, []);

  return <div className='container'>Home</div>;
};

export default Home;
