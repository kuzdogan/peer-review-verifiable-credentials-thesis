import moment from 'moment';
import React from 'react';
import ReviewAttribute from './ReviewAttribute';
import ReviewCheckboxAttribute from './ReviewCheckboxAttribute';

const AttributeChoice = ({ review, handleNextPage, selectedAttributes, setSelectedAttributes }) => (
  <div className='bg-white rounded-lg shadow-md p-12'>
    <div className='text-xl mb-2 font-bold text-center'> Peer Review Credential </div>
    <div className='text-sm mb-6 text-center'>
      {' '}
      Please select the attributes below you would like to share publicly on your profile{' '}
    </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review.id} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuance Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
      <ReviewAttribute label='Type' value={review.credentialSubject.type} />
      <ReviewCheckboxAttribute
        label='Name'
        value={review.credentialSubject.name}
        checked={selectedAttributes.name}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, name: !pre.name }))}
      />
      <ReviewCheckboxAttribute
        label='Journal'
        value={review.credentialSubject.journal}
        checked={selectedAttributes.journal}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, journal: !pre.journal }))}
      />
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review Author</div>
      <ReviewCheckboxAttribute
        label='Author ID'
        value={review.credentialSubject.author.id}
        checked={selectedAttributes.author.id}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, id: !pre.author.id } }))}
      />
      <ReviewCheckboxAttribute
        label='Given Name'
        value={review.credentialSubject.author.givenName}
        checked={selectedAttributes.author.givenName}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, givenName: !pre.author.givenName } }))}
      />
      <ReviewCheckboxAttribute
        label='Family Name'
        value={review.credentialSubject.author.familyName}
        checked={selectedAttributes.author.familyName}
        onChange={() =>
          setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, familyName: !pre.author.familyName } }))
        }
      />
      <ReviewCheckboxAttribute
        label='Email'
        value={review.credentialSubject.author.email}
        checked={selectedAttributes.author.email}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, email: !pre.author.email } }))}
      />
    </div>

    <div className='flex justify-end mt-4'>
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

export default AttributeChoice;
