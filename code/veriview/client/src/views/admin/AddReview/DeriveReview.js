import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { sunburst } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { createReviewProof } from 'services/reviewProof.service';
import { selectiveDisclose } from 'services/verify.service';
import colors from 'tailwindcss/colors';
import ReviewAttribute from './ReviewAttribute';

const SubmitButton = ({ isLoading, handleSubmit }) => (
  <button
    className={`${
      isLoading ? 'bg-lightBlue-300' : 'bg-lightBlue-500'
    } text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded ${
      isLoading ? null : 'shadow'
    } hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-center w-52`}
    type='button'
    onClick={handleSubmit}
  >
    {isLoading
      ? [
          <Loader key='submit-loader' type='Oval' color='white' height={20} width={20} />,
          <span className='ml-2' key='submit-text'>
            Submitting
          </span>,
        ]
      : [
          <i className='fas fa-upload' key='submit-icon' />,
          <span key='submit-text' className='ml-2'>
            Submit
          </span>,
        ]}
  </button>
);

const SuccessButton = () => (
  <button
    className='bg-green-500 cursor-default text-white font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 flex items-center justify-center w-52'
    type='button'
  >
    <i className='fas fa-check-circle' /> <span className='ml-2'>Submitted</span>
  </button>
);

const DeriveReview = ({ review, selectedAttributes, handlePrevPage }) => {
  const [derivedProof, setDerivedProof] = useState();
  const [showCode, setShowCode] = useState(false);
  const toggleShowCode = () => setShowCode(!showCode);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const downloadCredential = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(derivedProof, null, 2)], {
        type: 'application/json',
      })
    );
    a.setAttribute('download', `derivedPeerReview.jsonld`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(derivedProof);
    createReviewProof(derivedProof).then(() => {
      setIsSubmitSuccess(true);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const { title, content, reviewDate, competingInterestStatement, journal, manuscript } = selectedAttributes;
    // Create the JSON-LD frame
    const revealDocument = {
      '@context': review['@context'],
      type: review.type,
      credentialSubject: {
        '@explicit': true,
        type: review.credentialSubject.type,
        author: {
          '@explicit': true,
          type: 'PeerReviewAuthor',
          id: {},
          givenName: {},
          familyName: {},
          email: {},
        },
        title: title ? {} : null,
        content: content ? {} : null,
        reviewDate: reviewDate ? {} : null,
        competingInterestStatement: competingInterestStatement ? {} : null,
        journal:
          journal.id || journal.name || journal.issn
            ? {
                '@explicit': true,
                id: journal.id ? {} : null,
                name: journal.name ? {} : null,
                issn: journal.issn ? {} : null,
              }
            : null,
        manuscript:
          manuscript.id || manuscript.title || manuscript.abstract
            ? {
                '@explicit': true,
                id: manuscript.id ? {} : null,
                title: manuscript.title ? {} : null,
                abstract: manuscript.abstract ? {} : null,
              }
            : null,
      },
    };
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
      <div className='flex flex-col items-center'>
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
        <div>{isSubmitSuccess ? <SuccessButton /> : <SubmitButton isLoading={isLoading} handleSubmit={handleSubmit} />}</div>
      </div>

      {showCode ? (
        <SyntaxHighlighter language='json' style={sunburst} wrapLongLines>
          {JSON.stringify(derivedProof, null, 2)}
        </SyntaxHighlighter>
      ) : (
        <div>
          <div className='mt-4 text-lg font-bold underline'>Credential</div>
          <ReviewAttribute label='Credential ID' value={review.id} />
          <ReviewAttribute label='Name' value={review.name} />
          <ReviewAttribute label='Description' value={review.description} />
          <ReviewAttribute label='Issuer' value={review.issuer} />
          <ReviewAttribute label='Issuance Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

          <div className=''>
            <div className='mt-4 text-lg font-bold underline'>Review Author</div>
            <ReviewAttribute label='Author ID' value={derivedProof.credentialSubject.author.id} />
            <ReviewAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
            <ReviewAttribute label='Family Name' value={review.credentialSubject.author.email} />
            <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />
            <ReviewAttribute label='Institution' value={review.credentialSubject.author.institution} />
          </div>

          {derivedProof.credentialSubject && (
            <div className=''>
              <div className='mt-4 text-lg font-bold underline'>Review</div>
              {derivedProof.credentialSubject.id && (
                <ReviewAttribute label='Review ID' value={derivedProof.credentialSubject.id} />
              )}
              {derivedProof.credentialSubject.type && (
                <ReviewAttribute label='Type' value={derivedProof.credentialSubject.type} />
              )}
              {derivedProof.credentialSubject.title && (
                <ReviewAttribute label='Title' value={derivedProof.credentialSubject.title} />
              )}
              {derivedProof.credentialSubject.content && (
                <ReviewAttribute label='Content' value={`${derivedProof.credentialSubject.content.slice(0, 500)}...`} />
              )}
              {derivedProof.credentialSubject.reviewDate && (
                <ReviewAttribute label='Title' value={moment(derivedProof.credentialSubject.reviewDate).format('DD MMMM YYYY')} />
              )}
              {derivedProof.credentialSubject.competingInterestStatement && (
                <ReviewAttribute label='Content' value={derivedProof.credentialSubject.competingInterestStatement} />
              )}
            </div>
          )}

          {derivedProof.credentialSubject.journal && (
            <div className=''>
              <div className='mt-4 text-lg font-bold underline'>Journal</div>
              {derivedProof.credentialSubject.journal.id && (
                <ReviewAttribute label='ID' value={derivedProof.credentialSubject.journal.id} />
              )}
              {derivedProof.credentialSubject.journal.name && (
                <ReviewAttribute label='Name' value={derivedProof.credentialSubject.journal.name} />
              )}
              {derivedProof.credentialSubject.journal.issn && (
                <ReviewAttribute label='ISSN' value={derivedProof.credentialSubject.journal.issn} />
              )}
            </div>
          )}

          {derivedProof.credentialSubject.manuscript && (
            <div className=''>
              <div className='mt-4 text-lg font-bold underline'>Manuscript</div>
              {derivedProof.credentialSubject.manuscript.id && (
                <ReviewAttribute label='ID' value={derivedProof.credentialSubject.manuscript.id} />
              )}
              {derivedProof.credentialSubject.manuscript.title && (
                <ReviewAttribute label='Title' value={derivedProof.credentialSubject.manuscript.title} />
              )}
              {derivedProof.credentialSubject.manuscript.abstract && (
                <ReviewAttribute label='ISSN' value={derivedProof.credentialSubject.manuscript.abstract} />
              )}
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
      <div className='mt-4'>
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
};

export default DeriveReview;
