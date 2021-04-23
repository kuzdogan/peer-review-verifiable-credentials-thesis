import React, { useContext } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { logout } from '../../services/auth.service';
import UserContext from '../../UserContext';
import userIcon from './userIcon.png';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => !!matchPath(location.pathname, { path, exact: true, strict: true });

  const highlightActive = (path) => (isActive(path) ? 'bg-gray-200' : null);

  return (
    <div className='flex flex-col md:w-64 md:h-screen py-8 bg-white border-r md:fixed'>
      <h2 className='text-3xl font-semibold text-center text-gray-800'>Journal X</h2>

      <div className='flex flex-col items-center mt-6 -mx-2'>
        <img className='object-cover w-24 h-24 mx-2 rounded-full' src={userIcon} alt='avatar' />
        <h4 className='mx-2 mt-2 font-medium text-gray-800 hover:underline'>{user.name}</h4>
        <p className='mx-2 mt-1 text-sm font-medium text-gray-600 hover:underline'>{user.email}</p>
        <p className='mx-2 mt-1 text-sm font-medium text-gray-600 hover:underline'>
          {user.role === 'user' ? 'Author' : 'Editor'}
        </p>
      </div>

      <div className='flex flex-col justify-between flex-1 mt-6'>
        <nav className='flex flex-col flex-1'>
          <Link to='/home'>
            <a className={`flex items-center px-4 py-2 text-gray-700 ${highlightActive('/home')}`} href='#'>
              <span className='mx-4 font-medium'>Home</span>
            </a>
          </Link>

          <Link to='/manuscripts'>
            <a className={`flex items-center px-4 py-2 text-gray-700 ${highlightActive('/manuscripts')}`} href='#'>
              <span className='mx-4 font-medium'>Manuscripts</span>
            </a>
          </Link>

          <Link to='/reviews'>
            <a className={`flex items-center px-4 py-2 text-gray-700 ${highlightActive('/reviews')}`} href='#'>
              <span className='mx-4 font-medium'>Reviews</span>
            </a>
          </Link>
          {user.role === 'editor' ? (
            <Link to='/reviews/manage'>
              <a className={`flex items-center px-4 py-2 text-gray-700 ${highlightActive('/reviews/manage')}`} href='#'>
                <span className='mx-4 font-medium'>Manage Reviews</span>
              </a>
            </Link>
          ) : null}

          <a
            className='flex justify-center align-self-end px-4 py-2 mx-8 rounded-xl mt-auto text-gray-50 transition-colors duration-200 transform bg-red-400 hover:bg-red-600'
            href='#'
            onClick={logout}
          >
            <span className='font-medium'>Log Out</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
