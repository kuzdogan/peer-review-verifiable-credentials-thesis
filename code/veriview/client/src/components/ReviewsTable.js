// components
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const TableHeaderCell = ({ label }) => (
  <th className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'>
    {label}
  </th>
);

const VerifiedIcon = ({ isVerified }) =>
  isVerified ? <i className='fas fa-check mr-2 text-green-500' /> : <i className='fas fa-times mr-2 text-red-500' />;

const TableRow = ({ reviewProof }) => {
  const [isVerified, setIsVerified] = useState();

  console.log(reviewProof);
  const { createdAt, _id, user, ...originalReviewProof } = reviewProof;
  useEffect(() => {
    // console.log(originalReviewProof);
    // verifySelectiveDisclosedCredential(originalReviewProof).then((res) => {
    //   console.log(res);
    //   setIsVerified(res.verified);
    // });
  }, []);

  const style = 'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4';
  return (
    <tr>
      <td className={style}>
        {reviewProof.credentialSubject.journal?.name ? reviewProof.credentialSubject.journal.name : 'N/A'}
      </td>
      <td className={style}>{reviewProof.issuer ? reviewProof.issuer : 'N/A'}</td>
      <td className={style}>{reviewProof.credentialSubject.title ? reviewProof.credentialSubject.title : 'N/A'}</td>
      <td className={`${style} text-center`}>
        {' '}
        {reviewProof.issuanceDate ? moment(reviewProof.issuanceDate).format('DD MMM YYYY') : 'N/A'}
      </td>
      <td className={`${style} text-center`}>
        {' '}
        {reviewProof.createdAt ? moment(reviewProof.createdAt).format('DD MMM YYYY') : 'N/A'}
      </td>
      <td className={`${style} text-center`}>
        {' '}
        {/* ? <Loader type='Oval' height={20} />  */}
        {isVerified === undefined ? <div>?</div> : <VerifiedIcon isVerified={isVerified} />}
      </td>
    </tr>
  );
};
export default function ReviewsTable({ reviewProofs }) {
  console.log(reviewProofs);
  const headers = ['Journal', 'Issuer', 'Title', 'Issuance Date', 'Submitted At', 'Proof Verified'];
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'>
        <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3 className='font-semibold text-lg text-blueGray-70'>Shared Review Proofs</h3>
            </div>
          </div>
        </div>
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <TableHeaderCell label={header} key={`header-${i}`} />
                ))}
              </tr>
            </thead>
            <tbody>
              {reviewProofs.map((reviewProof, i) => (
                <TableRow reviewProof={reviewProof} key={`row-${i}`} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
