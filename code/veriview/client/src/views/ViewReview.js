import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { sunburst } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { readReviewProof } from 'services/reviewProof.service';
import colors from 'tailwindcss/colors';
import { formatDBreviewProof } from 'utils/deriveProof';
import ReviewAttribute from './admin/AddReview/ReviewAttribute';

const ViewReviews = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState();
  const [showCode, setShowCode] = useState(false);

  const toggleShowCode = () => setShowCode(!showCode);

  useEffect(() => {
    readReviewProof(reviewId).then((fetchedReview) => setReview(fetchedReview));
  }, []);

  if (!review) {
    return (
      <div className='flex flex-col items-center'>
        <Loader type='Circles' color={colors.lightBlue['500']} height={100} />
        <div>Generating selectively disclosed peer review</div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-12 m-8'>
      <div className='flex items-center justify-center'>
        <button
          className='text-lightBlue-500 bg-transparent border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 margin-auto'
          type='button'
          onClick={toggleShowCode}
        >
          <i className='fas fa-file-code mr-2' />
          {showCode ? 'Hide ' : 'Show '} Code
        </button>
      </div>

      {showCode ? (
        <SyntaxHighlighter language='json' style={sunburst} wrapLongLines>
          {JSON.stringify(formatDBreviewProof(review), null, 2)}
        </SyntaxHighlighter>
      ) : (
        <div>
          <div className='mt-4 text-lg font-bold underline'>Credential</div>
          <ReviewAttribute label='Credential ID' value={review.id} />
          <ReviewAttribute label='Name' value={review.name} />
          <ReviewAttribute label='Description' value={review.description} />
          <ReviewAttribute label='Issuer' value={review.issuer} />
          <ReviewAttribute label='Issuence Date' value={moment(review.issuanceDate).format('DD MMMM YYYY')} />

          <hr className='my-2' />

          <div className=''>
            <div className='mt-4 text-lg font-bold underline'>Review</div>
            <ReviewAttribute label='Review ID' value={review.credentialSubject.id} />
            <ReviewAttribute label='Type' value={review.credentialSubject.type} />
            {review.credentialSubject.title && <ReviewAttribute label='Title' value={review.credentialSubject.title} />}
            {review.credentialSubject.content && (
              <ReviewAttribute label='Content' value={`${review.credentialSubject.content.slice(0, 500)}...`} />
            )}
            {review.credentialSubject.reviewDate && (
              <ReviewAttribute label='Review Date' value={moment(review.credentialSubject.reviewDate).format('DD MMMM YYYY')} />
            )}
            {review.credentialSubject.competingInterestStatement && (
              <ReviewAttribute label='Competing Interest Statement' value={review.credentialSubject.competingInterestStatement} />
            )}
          </div>

          <div className=''>
            <div className='mt-4 text-lg font-bold underline'>Journal</div>
            {review.credentialSubject.journal.id && <ReviewAttribute label='ID' value={review.credentialSubject.journal.id} />}
            {review.credentialSubject.journal.name && (
              <ReviewAttribute label='Name' value={review.credentialSubject.journal.name} />
            )}
            {review.credentialSubject.journal.issn && (
              <ReviewAttribute label='ISSN' value={review.credentialSubject.journal.issn} />
            )}
          </div>

          <div className=''>
            <div className='mt-4 text-lg font-bold underline'>Review Author</div>
            {review.credentialSubject.author.id && (
              <ReviewAttribute label='Author ID' value={review.credentialSubject.author.id} />
            )}
            {review.credentialSubject.author.givenName && (
              <ReviewAttribute label='Given Name' value={review.credentialSubject.author.givenName} />
            )}
            {review.credentialSubject.author.familyName && (
              <ReviewAttribute label='Family Name' value={review.credentialSubject.author.familyName} />
            )}
            {review.credentialSubject.author.email && (
              <ReviewAttribute label='Email' value={review.credentialSubject.author.email} />
            )}
            {review.credentialSubject.author.institution && (
              <ReviewAttribute label='Institution' value={review.credentialSubject.author.institution} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReviews;
