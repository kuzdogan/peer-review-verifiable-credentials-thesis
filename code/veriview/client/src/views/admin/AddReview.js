import moment from 'moment';
import React, { useRef, useState } from 'react';

const AddReview = () => {
  const inputFile = useRef(null);
  const [review, setReview] = useState();
  const [isConfirmPage, setIsConfirmPage] = useState();
  const [selectedAttributes, setSelectedAttributes] = useState({
    name: true,
    journal: true,
    author: {
      id: true,
      givenName: true,
      familyName: true,
      email: true,
    },
  });

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

  const handleNextPage = () => {
    setIsConfirmPage(true);
  };

  const handlePrevPage = () => {
    setIsConfirmPage(false);
  };

  if (!review) {
    return (
      <div className='flex flex-col flex-wrap mt-4 h-full items-center justify-center'>
        <button
          className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={handleButtonClick}
        >
          <i className='fas fa-file-upload mr-2' /> Add a Review Credential
        </button>{' '}
        <input
          type='file'
          accept='.json, application/json'
          id='file'
          ref={inputFile}
          className='hidden'
          onChange={handleChangeFile}
        />
      </div>
    );
  }
  return (
    <div className='flex flex-col flex-wrap mt-4 h-full items-center justify-center'>
      {isConfirmPage ? (
        <ReviewConfirm handlePrevPage={handlePrevPage} review={review} selectedAttributes={selectedAttributes} />
      ) : (
        <ReviewDisplayAndChoose
          review={review}
          handleNextPage={handleNextPage}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />
      )}
    </div>
  );
};

const ReviewAttribute = ({ label, value, children }) => (
  <div className='flex flex-wrap'>
    {children}
    <div className='md:w-1/6'>
      <b>{label}</b>
    </div>
    <div className='md:w-8/12'>{value}</div>
  </div>
);

const ReviewCheckBoxAttribute = ({ label, value, checked, disabled, onChange }) => (
  <ReviewAttribute label={label} value={value}>
    <input
      type='checkbox'
      className={`${disabled ? 'text-gray-300' : 'text-lightBlue-500'} cursor-pointer mr-2 mt-1`}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  </ReviewAttribute>
);

const ReviewDisplayAndChoose = ({ review, handleNextPage, selectedAttributes, setSelectedAttributes }) => (
  <div className='bg-white rounded-lg shadow-md p-12'>
    <div className='text-xl mb-2  font-bold text-center'> Peer Review Credential </div>
    <div className='text-sm mb-6 text-center'>
      {' '}
      Please select the attributes below you would like to share publicly on your profile{' '}
    </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review['@id']} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('YY MMMM YYYY')} />

    <hr className='my-2' />

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review</div>
      <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
      <ReviewAttribute label='Type' value={review.credentialSubject.type} />
      <ReviewCheckBoxAttribute
        label='Name'
        value={review.credentialSubject.name}
        checked={selectedAttributes.name}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, name: !pre.name }))}
      />
      <ReviewCheckBoxAttribute
        label='Journal'
        value={review.credentialSubject.journal}
        checked={selectedAttributes.journal}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, journal: !pre.journal }))}
      />
    </div>

    <div className=''>
      <div className='mt-4 text-lg font-bold underline'>Review Author</div>
      <ReviewCheckBoxAttribute
        label='Author ID'
        value={review.credentialSubject.author.id}
        checked={selectedAttributes.author.id}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, id: !pre.author.id } }))}
      />
      <ReviewCheckBoxAttribute
        label='Given Name'
        value={review.credentialSubject.author.givenName}
        checked={selectedAttributes.author.givenName}
        onChange={() => setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, givenName: !pre.author.givenName } }))}
      />
      <ReviewCheckBoxAttribute
        label='Family Name'
        value={review.credentialSubject.author.familyName}
        checked={selectedAttributes.author.familyName}
        onChange={() =>
          setSelectedAttributes((pre) => ({ ...pre, author: { ...pre.author, familyName: !pre.author.familyName } }))
        }
      />
      <ReviewCheckBoxAttribute
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

const ReviewConfirm = ({ handlePrevPage, review, selectedAttributes }) => (
  <div className='bg-white rounded-lg shadow-md p-12 m-8'>
    <div className='text-xl mb-2  font-bold text-center'> Derive Peer Review Credential </div>
    <div className='text-sm mb-6 text-center'> A credential will be derived with the following attributes only </div>
    <div className='mt-4 text-lg font-bold underline'>Credential</div>
    <ReviewAttribute label='Credential ID' value={review['@id']} />
    <ReviewAttribute label='Description' value={review.description} />
    <ReviewAttribute label='Issuer' value={review.issuer} />
    <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('YY MMMM YYYY')} />

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
      {selectedAttributes.name && <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />}
    </div>
    <div className='flex mt-4'>
      <button
        className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
        type='button'
        onClick={handlePrevPage}
      >
        <i className='fas fa-arrow-left' /> Previous
      </button>
    </div>
  </div>
);

export default AddReview;
