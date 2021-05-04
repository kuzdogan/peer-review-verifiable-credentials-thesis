// components
import moment from 'moment';
import React, { useRef, useState } from 'react';

export default function Reviews() {
  const inputFile = useRef(null);
  const [review, setReview] = useState();

  const handleButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  async function fileToJSON(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });
  }

  const handleChangeFile = async (event) => {
    const file = event.target.files[0];
    const fileJSON = await fileToJSON(file);
    setReview(fileJSON);
    console.log(fileJSON);
  };

  return (
    <>
      <div className='flex flex-col flex-wrap mt-4 h-full items-center justify-center'>
        <button
          className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={handleButtonClick}
        >
          <i className='fas fa-file-upload mr-2' /> Add a Review Credential
        </button>
        {review && <ReviewDisplay review={review} />}
        <input
          type='file'
          accept='.json, application/json'
          id='file'
          ref={inputFile}
          className='hidden'
          onChange={handleChangeFile}
        />

        <div>You have no reviews</div>
      </div>
    </>
  );
}

const ReviewAttribute = ({ label, value, children }) => (
  <div className='flex flex-wrap items-center'>
    {children}
    <div className='ml-2 w-2/12'>
      <b>{label}</b>
    </div>
    <div className='w-auto'>{value}</div>
  </div>
);

const ReviewCheckBoxAttribute = ({ label, value, checked, disabled }) => (
  <ReviewAttribute label={label} value={value}>
    <input type='checkbox' className={disabled && 'text-gray-300'} defaultChecked value={checked} disabled={disabled} />
  </ReviewAttribute>
);

const ReviewDisplay = ({ review }) => (
  <div className='bg-white rounded-lg shadow-md p-12 m-8'>
    <div className='text-xl mb-2  font-bold'> Peer Review Credential </div>
    <div className='text-sm mb-6 '> Please select the attributes below you would like to share publicly on your profile </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review['@id']} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('YY MMMM YYYY')} />

    <hr className='my-2' />

    <div className='ml-4'>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewCheckBoxAttribute label='Review ID' value={review.credentialSubject.id} disabled />
      <ReviewCheckBoxAttribute label='Type' value={review.credentialSubject.type} disabled />
      <ReviewCheckBoxAttribute label='Name' value={review.credentialSubject.name} />
      <ReviewCheckBoxAttribute label='Journal' value={review.credentialSubject.journal} />
    </div>

    <div className='ml-8'>
      <div className='mt-4 text-lg font-bold underline'>Author</div>
      <ReviewCheckBoxAttribute label='Author ID' value={review.credentialSubject.author.id} />
      <ReviewCheckBoxAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
      <ReviewCheckBoxAttribute label='Family Name' value={review.credentialSubject.author.familyName} />
      <ReviewCheckBoxAttribute label='Email' value={review.credentialSubject.author.email} />
    </div>
  </div>
);
