import React, { useState } from 'react';
import { register } from '../../services/auth.service';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeInstitution = (e) => {
    setInstitution(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(firstName, lastName, institution, email, password);
  };
  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-sm font-bold'>Sign up with</h6>
                </div>
                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <div className='text-blueGray-400 text-center mb-3 font-bold'>
                  <small>Or sign up with credentials</small>
                </div>
                <form onSubmit={handleRegister}>
                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-firstName'>
                      First name
                    </label>
                    <input
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='First Name'
                      onChange={handleChangeFirstName}
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-lastName'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='LastName'
                      onChange={handleChangeLastName}
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-institution'>
                      Institution
                    </label>
                    <input
                      type='text'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='E.g. Technical University of Munich'
                      onChange={handleChangeInstitution}
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-password'>
                      Email
                    </label>
                    <input
                      type='email'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Email'
                      onChange={handleChangeEmail}
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label className='block uppercase text-blueGray-600 text-xs font-bold mb-2' htmlFor='grid-password'>
                      Password
                    </label>
                    <input
                      type='password'
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                      onChange={handleChangePassword}
                    />
                  </div>

                  <div className='text-center mt-6'>
                    <button
                      className='bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      type='submit'
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
