import moment from 'moment';
import React from 'react';
import ReviewAttribute from './ReviewAttribute';

const ReviewConfirm = ({ handlePrevPage, review, selectedAttributes, handleNextPage }) => (
  <div className='bg-white rounded-lg shadow-md p-12 m-8'>
    <div className='text-xl mb-2  font-bold text-center'> Derive Peer Review Credential </div>
    <div className='text-sm mb-6 text-center'> A credential will be derived with the following attributes only </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review.id} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
      <ReviewAttribute label='Type' value={review.credentialSubject.type} />
      {selectedAttributes.name && <ReviewAttribute label='Name' value={review.credentialSubject.name} />}
      {selectedAttributes.journal && <ReviewAttribute label='Journal' value={review.credentialSubject.journal} />}
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review Author</div>
      {selectedAttributes.author.id && <ReviewAttribute label='Author ID' value={review.credentialSubject.author.id} />}
      {selectedAttributes.author.givenName && (
        <ReviewAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
      )}
      {selectedAttributes.author.familyName && (
        <ReviewAttribute label='Family Name' value={review.credentialSubject.author.email} />
      )}
      {selectedAttributes.author.email && <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />}
    </div>
    <div className='flex mt-4 justify-between'>
      <button
        className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={handlePrevPage}
      >
        <i className='fas fa-arrow-left' /> Previous
      </button>
      <button
        className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={handleNextPage}
      >
        <i className='fas fa-arrow-right' /> Next
      </button>
    </div>
  </div>
);

export default ReviewConfirm;
