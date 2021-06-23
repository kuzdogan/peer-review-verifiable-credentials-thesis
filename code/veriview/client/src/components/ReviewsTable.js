// components
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
// import { verifyDerivedProof } from 'services/verify.service';
import { formatDBreviewProof, verifyDerivedProof } from 'utils/credentialUtils';

const TableHeaderCell = ({ label }) => (
  <th className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100'>
    {label}
  </th>
);

const VerifiedIcon = ({ isVerified }) =>
  isVerified ? <i className='fas fa-check mr-2 text-green-500' /> : <i className='fas fa-times mr-2 text-red-500' />;

const TableRow = ({ reviewProof }) => {
  const [isVerified, setIsVerified] = useState();

  const originalReviewProof = formatDBreviewProof(reviewProof);
  useEffect(() => {
    // verifySelectiveDisclosedCredential(originalReviewProof).then((res) => {
    //   console.log(res);
    //   setIsVerified(res.verified);
    // });
    verifyDerivedProof(originalReviewProof).then((res) => {
      setIsVerified(res.verified);
      // Log output to console why verification failed
      !res.verified && console.log(res);
    });
  }, []);

  const style = 'border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4';
  return (
    <Link style={{ display: 'contents' }} to={`/reviews/${reviewProof._id}`}>
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
          {isVerified === undefined ? <Loader type='Oval' height={20} /> : <VerifiedIcon isVerified={isVerified} />}
        </td>
      </tr>
    </Link>
  );
};
export default function ReviewsTable({ reviewProofs }) {
  const headers = ['Journal', 'Issuer', 'Title', 'Issuance Date', 'Submitted At', 'Proof Verified'];
  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white'>
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
