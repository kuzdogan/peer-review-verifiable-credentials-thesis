import React, { useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { createManuscript } from '../services/manuscript.service';

export default function SubmitManuscriptPage() {
  const [title, setTitle] = useState();
  const [abstract, setAbstract] = useState();
  const [content, setContent] = useState();
  const history = useHistory();

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleAbstractChange = (e) => setAbstract(e.target.value);

  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    createManuscript({ title, abstract, content }).then((res) => {
      if (res.status === 201) {
        history.push(`/manuscripts/${res.data.id}`);
      } else {
        alert('An error occured');
        console.log(res);
      }
    });
  };

  return (
    <div
      className='flex flex-1 items-center justify-center
  '
    >
      <form className='container  mx-auto shadow-lg flex-1' onSubmit={handleSubmit}>
        <div className='space-y-4 bg-white rounded-3xl mx-12'>
          <div className='flex flex-col w-full p-12 space-y-4 text-gray-500'>
            <h2 className='text-black'>Title</h2>
            <div className=''>
              <div className=' relative '>
                <input
                  type='text'
                  id='manuscript-form-title'
                  onChange={handleTitleChange}
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  placeholder='Title'
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='flex flex-col w-full p-12 space-y-4 text-gray-500'>
            <h2 className='text-black'>Abstract</h2>
            <div className=''>
              <div className=' relative '>
                <textarea
                  id='manuscript-form-abstract'
                  onChange={handleAbstractChange}
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  placeholder='Abstract'
                  rows='8'
                  cols='40'
                />
              </div>
            </div>
          </div>

          <hr />

          <div className='flex flex-col w-full p-12 space-y-4 text-gray-500'>
            <h2 className='text-black'>Content</h2>
            <div className=''>
              <div className=' relative '>
                <textarea
                  id='manuscript-form-content'
                  onChange={handleContentChange}
                  className=' rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                  placeholder='Content'
                  rows='20'
                  cols='40'
                />
              </div>
            </div>
          </div>

          <hr />
          <div className='w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3'>
            <button
              type='submit'
              className='py-2 px-4 flex justify-center items-center  w-full bg-green-600 hover:bg-green-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '
            >
              <AiFillFileAdd className='mr-2' /> Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
