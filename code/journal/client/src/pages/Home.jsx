import React, { useEffect } from 'react';

const Home = () => {
  // const [content, setContent] = useState('');

  useEffect(() => {
    console.log('Welcome home');
  }, []);

  return <div className='h-screen v-full'>Home</div>;
};

export default Home;
