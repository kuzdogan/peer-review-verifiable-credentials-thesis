import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { sunburst } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import colors from 'tailwindcss/colors';
import { selectiveDisclose } from 'utils/deriveProof';

const AddReview = () => {
  const inputFile = useRef(null);
  const [review, setReview] = useState();
  const [page, setPage] = useState(0);
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
          accept='.json, application/json'
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
        <ReviewDisplayAndChoose
          review={review}
          handleNextPage={handleNextPage}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
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
      renderContent = <DeriveReview review={review} />;
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

const ReviewAttribute = ({ label, value, children }) => (
  <div className='flex flex-wrap'>
    {children}
    <div className='md:w-1/6'>
      <b>{label}</b>
    </div>
    <div className='md:w-8/12 break-words'>{value}</div>
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
    <div className='text-xl mb-2 font-bold text-center'> Peer Review Credential </div>
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

const ReviewConfirm = ({ handlePrevPage, review, selectedAttributes, handleNextPage }) => (
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

const DeriveReview = ({ review }) => {
  const [derivedProof, setDerivedProof] = useState();
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => setShowCode(!showCode);

  const downloadCredential = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(derivedProof, null, 2)], {
        type: 'application/json',
      })
    );
    a.setAttribute('download', `derivedPeerReview.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const revealDocument = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json',
      'https://w3id.org/security/bbs/v1',
    ],
    type: ['VerifiableCredential', 'PeerReviewCredential'],
    credentialSubject: {
      '@explicit': true,
      type: 'PeerReview',
      journal: {},
    },
  };

  useEffect(() => {
    selectiveDisclose(review, revealDocument).then((doc) => setDerivedProof(doc));
  }, []);

  if (!derivedProof) {
    return (
      <div className='flex flex-col items-center'>
        <Loader type='Circles' color={colors.lightBlue['500']} height={100} />
        <div>Generating selectively disclosed peer review</div>
      </div>
    );
  }
  return (
    <div className='bg-white rounded-lg shadow-md p-12 m-8 w-full h-full'>
      <div className='text-xl mb-2  font-bold text-center'> Selectively Disclosed Peer Review Credential </div>
      <div className='flex justify-center'>
        <div>
          <button
            className='text-lightBlue-500 bg-transparent border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={toggleShowCode}
          >
            <i className='fas fa-file-code mr-2' />
            {showCode ? 'Hide ' : 'Show '} Code
          </button>
          <button
            className='text-green-500 bg-transparent border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={downloadCredential}
          >
            <i className='fas fa-file-download mr-2' />
            Download Credential
          </button>
        </div>
        <div>
          <button
            className='bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
          >
            <i className='fas fa-upload' /> Submit
          </button>
        </div>
      </div>

      {showCode ? (
        <SyntaxHighlighter language='json' style={sunburst} wrapLongLines>
          {JSON.stringify(derivedProof, null, 2)}
        </SyntaxHighlighter>
      ) : (
        <div>
          <ReviewAttribute label='Credential ID' value={review['@id']} />
          <ReviewAttribute label='Description' value={review.description} />
          <ReviewAttribute label='Issuer' value={review.issuer} />
          <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('YY MMMM YYYY')} />
          {derivedProof.credentialSubject && (
            <div className=''>
              <div className='mt-4 text-lg font-bold underline'>Review</div>
              {derivedProof.credentialSubject.id && (
                <ReviewAttribute label='Review ID' value={derivedProof.credentialSubject.id} />
              )}
              {derivedProof.credentialSubject.type && (
                <ReviewAttribute label='Type' value={derivedProof.credentialSubject.type} />
              )}
              {derivedProof.credentialSubject.name && (
                <ReviewAttribute label='Name' value={derivedProof.credentialSubject.name} />
              )}
              {derivedProof.credentialSubject.journal && (
                <ReviewAttribute label='Journal' value={derivedProof.credentialSubject.journal} />
              )}
            </div>
          )}
          {derivedProof.author && (
            <div className=''>
              <div className='mt-4 text-lg font-bold underline'>Review Author</div>
              {derivedProof.author.id && <ReviewAttribute label='Author ID' value={derivedProof.credentialSubject.author.id} />}
              {derivedProof.author.givenName && (
                <ReviewAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
              )}
              {derivedProof.author.familyName && (
                <ReviewAttribute label='Family Name' value={review.credentialSubject.author.email} />
              )}
              {derivedProof.name && <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />}
            </div>
          )}

          <div className='mt-4 text-lg font-bold underline'>Proof</div>
          <ReviewAttribute label='Proof Type' value={derivedProof.proof.type} />
          <ReviewAttribute label='Proof Created At' value={moment(derivedProof.proof.created).format('DD MMMM YYYY')} />
          <ReviewAttribute label='Nonce' value={derivedProof.proof.nonce} />
          <ReviewAttribute label='Proof Purpose' value={derivedProof.proof.proofPurpose} />
          <ReviewAttribute label='Proof' value={derivedProof.proof.proofValue} />
          <ReviewAttribute label='Verification Method' value={derivedProof.proof.verificationMethod} />
        </div>
      )}
    </div>
  );
};

export default AddReview;
