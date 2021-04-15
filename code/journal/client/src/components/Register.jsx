import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <div className='flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10'>
      <div className='self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white'>Create a new account</div>
      <span className='justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400'>
        Already have an account ?
        <a href='#' target='_blank' className='text-sm text-blue-500 underline hover:text-blue-700'>
          Sign in
        </a>
      </span>
      <div className='p-6 mt-8'>
        <form onSubmit={handleRegister}>
          <div className='flex flex-col mb-2'>
            <div className=' relative '>
              <input
                type='text'
                id='create-account-pseudo'
                className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                name='pseudo'
                placeholder='Pseudo'
              />
            </div>
          </div>
          <div className='flex gap-4 mb-2'>
            <div className=' relative '>
              <input
                type='text'
                id='create-account-first-name'
                className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                name='Name'
                placeholder='Name'
                onChange={handleChangeName}
              />
            </div>
          </div>
          <div className='flex flex-col mb-2'>
            <div className=' relative '>
              <input
                type='text'
                id='create-account-email'
                className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                placeholder='Email'
                onChange={handleChangeEmail}
              />
            </div>
          </div>
          <div className='flex flex-col mb-2'>
            <div className=' relative '>
              <input
                type='password'
                id='create-account-password'
                className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                placeholder='Password'
                onChange={handleChangePassword}
              />
            </div>
          </div>
          <div className='flex w-full my-4'>
            <button
              type='submit'
              className='py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
