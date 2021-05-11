import moment from 'moment';
import React from 'react';
import ReviewAttribute from './ReviewAttribute';
import ReviewCheckboxAttribute from './ReviewCheckboxAttribute';

const VerifiedBadge = ({ isVerified }) => (
  <div className=''>
    {isVerified ? (
      <div className='text-green-700 py-2 px-4 rounded-full bg-green-200'>
        <i className='fas fa-check-square mr-2' />
        Verified
      </div>
    ) : (
      <div className='text-red-700 py-2 px-4 rounded-full bg-red-200'>
        <i className='fas fa-times mr-2' />
        Not Verified
      </div>
    )}
  </div>
);

const AttributeChoice = ({ review, handleNextPage, selectedAttributes, setSelectedAttributes, isFullCredentialVerified }) => (
  <div className='bg-white rounded-lg shadow-md p-12'>
    <div className='text-xl mb-2 font-bold text-center'> Peer Review Credential </div>
    <div className='flex items-center justify-center'>
      {' '}
      {isFullCredentialVerified === undefined ? 'undefined' : <VerifiedBadge isVerified={isFullCredentialVerified} />}{' '}
    </div>

    <div className='text-sm mb-6 text-center'>
      {' '}
      Please select the attributes below you would like to share publicly on your profile{' '}
    </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review.id} />
    <ReviewAttribute label='Name' value={review.name} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuance Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
      <ReviewAttribute label='Type' value={review.credentialSubject.type} />
      <ReviewCheckboxAttribute
        label='Title'
        value={review.credentialSubject.title}
        checked={selectedAttributes.title}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, title: !pre.title }))}
      />
      <ReviewCheckboxAttribute
        label='Content'
        value={`${review.credentialSubject.content.slice(0, 500)}...`}
        checked={selectedAttributes.content}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, content: !pre.content }))}
      />
      <ReviewCheckboxAttribute
        label='Review Date'
        value={moment(review.credentialSubject.reviewDate).format('DD MMMM YYYY')}
        checked={selectedAttributes.reviewDate}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, reviewDate: !pre.reviewDate }))}
      />
      <ReviewCheckboxAttribute
        label='Competing Interest Statement'
        value={review.credentialSubject.competingInterestStatement}
        checked={selectedAttributes.competingInterestStatement}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, competingInterestStatement: !pre.competingInterestStatement }))}
      />
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Journal</div>
      <ReviewCheckboxAttribute
        label='ID'
        value={review.credentialSubject.journal.id}
        checked={selectedAttributes.journal.id}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, journal: { ...pre.journal, id: !pre.journal.id } }))}
      />
      <ReviewCheckboxAttribute
        label='Name'
        value={review.credentialSubject.journal.name}
        checked={selectedAttributes.journal.name}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, journal: { ...pre.journal, name: !pre.journal.name } }))}
      />
      <ReviewCheckboxAttribute
        label='ISSN'
        value={review.credentialSubject.journal.issn}
        checked={selectedAttributes.journal.issn}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, journal: { ...pre.journal, issn: !pre.journal.issn } }))}
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
      <ReviewCheckboxAttribute
        label='Institution'
        value={review.credentialSubject.author.institution}
        checked={selectedAttributes.author.institution}
        onChange={() =>
          setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, institution: !pre.author.institution } }))
        }
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
