import React, { useRef, useState } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { verifyReviewCredential } from 'services/verify.service';
import AttributeChoice from './AttributeChoice';
import DeriveReview from './DeriveReview';
import ReviewConfirm from './ReviewConfirm';

const AddReview = () => {
  const inputFile = useRef(null);
  const [review, setReview] = useState();
  const [page, setPage] = useState(0);
  const [isFullCredentialVerified, setIsFullCredentialVerified] = useState();
  const [selectedAttributes, setSelectedAttributes] = useState({
    title: true,
    content: true,
    reviewDate: true,
    competingInterestStatement: true,
    journal: {
      id: true,
      name: true,
      issn: true,
    },
    author: {
      id: true,
      givenName: true,
      familyName: true,
      email: true,
      institution: true,
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
    try {
      const file = event.target.files[0];
      const fileJSON = await fileToJSON(file);
      setReview(fileJSON);
      const result = await verifyReviewCredential(fileJSON);
      setIsFullCredentialVerified(result.verified);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  // Show add review button if no review added
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
          accept='.json, .jsonld, application/json'
          id='file'
          ref={inputFile}
          className='hidden'
          onChange={handleChangeFile}
        />
      </div>
    );
  }

  // If review added, choose which page to render
  let renderContent;
  switch (page) {
    case 0:
      renderContent = (
        <AttributeChoice
          review={review}
          handleNextPage={handleNextPage}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          isFullCredentialVerified={isFullCredentialVerified}
        />
      );
      break;
    case 1:
      renderContent = (
        <ReviewConfirm
          handlePrevPage={handlePrevPage}
          review={review}
          handleNextPage={handleNextPage}
          selectedAttributes={selectedAttributes}
        />
      );
      break;
    case 2:
      renderContent = <DeriveReview review={review} selectedAttributes={selectedAttributes} handlePrevPage={handlePrevPage} />;
      break;
    default:
      renderContent = (
        <ReviewConfirm
          handlePrevPage={handlePrevPage}
          review={review}
          handleNextPage={handleNextPage}
          selectedAttributes={selectedAttributes}
        />
      );
      break;
  }

  // Return in wrapper
  return <div className='flex flex-1 flex-col flex-wrap mt-4 w-full h-full items-center justify-center'>{renderContent}</div>;
};

export default AddReview;
