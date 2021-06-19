import moment from 'moment';
import React from 'react';
import ReviewAttribute from './ReviewAttribute';

const ReviewConfirm = ({ handlePrevPage, review, selectedAttributes, handleNextPage }) => (
  <div className='bg-white rounded-lg shadow-md p-12 m-8'>
    <div className='text-xl mb-2  font-bold text-center'> Derive Peer Review Credential </div>
    <div className='text-sm mb-6 text-center'> A credential will be derived with the following attributes only </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review.id} />
    <ReviewAttribute label='Name' value={review.name} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review Author</div>
      <ReviewAttribute label='Author ID' value={review.credentialSubject.author.id} />
      <ReviewAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
      <ReviewAttribute label='Family Name' value={review.credentialSubject.author.familyName} />
      <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />
      <ReviewAttribute label='Institution' value={review.credentialSubject.author.institution} />
    </div>

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
      <ReviewAttribute label='Type' value={review.credentialSubject.type} />
      {selectedAttributes.title && <ReviewAttribute label='Title' value={review.credentialSubject.title} />}
      {selectedAttributes.content && (
        <ReviewAttribute label='Content' value={`${review.credentialSubject.content.slice(0, 500)}...`} />
      )}
      {selectedAttributes.reviewDate && (
        <ReviewAttribute label='Review Date' value={moment(review.credentialSubject.reviewDate).format('DD MMMM YYYY')} />
      )}
      {selectedAttributes.competingInterestStatement && (
        <ReviewAttribute label='Competing Interest Statement' value={review.credentialSubject.competingInterestStatement} />
      )}
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Journal</div>
      {selectedAttributes.journal.id && <ReviewAttribute label='ID' value={review.credentialSubject.journal.id} />}
      {selectedAttributes.journal.name && <ReviewAttribute label='Name' value={review.credentialSubject.journal.name} />}
      {selectedAttributes.journal.issn && <ReviewAttribute label='ISSN' value={review.credentialSubject.journal.issn} />}
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Manuscript</div>
      {selectedAttributes.manuscript.id && <ReviewAttribute label='ID' value={review.credentialSubject.manuscript.id} />}
      {selectedAttributes.manuscript.title && <ReviewAttribute label='Title' value={review.credentialSubject.manuscript.title} />}
      {selectedAttributes.manuscript.abstract && (
        <ReviewAttribute label='Abstract' value={review.credentialSubject.manuscript.abstract} />
      )}
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
