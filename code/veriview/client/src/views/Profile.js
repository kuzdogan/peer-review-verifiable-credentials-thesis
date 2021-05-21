import ReviewsTable from 'components/ReviewsTable';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserById } from 'services/user.service';
import { verifyDerivedProof } from 'services/verify.service';
import { formatDBreviewProof } from 'utils/deriveProof';
import ReviewChart from '../components/ReviewChart';
import { readReviewProofs } from '../services/reviewProof.service';

const JournalBox = ({ journalName, reviews }) => (
  <div className='flex items-center p-2 m-2 md:w-1/2 shadow-lg rounded-lg text-blueGray-600 bg-gray-100'>
    <div className='flex items-center justify-center text-center rounded-full w-8 h-8 bg-lightBlue-200 text-lightBlue-600 mr-2'>
      {reviews.length}
    </div>
    {journalName}
  </div>
);
export default function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [reviewProofs, setReviewProofs] = useState();
  const [verfiedReviewProofs, setVerifiedReviewProofs] = useState();
  const [unverfiedReviewProofs, setUnverifiedReviewProofs] = useState();
  const [reviewsByJournalName, setReviewsByJournalName] = useState();

  const groupReviewsByJournalName = (reviews) => {
    const result = {};
    reviews.forEach((rp) => {
      const journalName = rp.credentialSubject.journal.name;
      if (result[journalName] === undefined) {
        result[journalName] = [];
      }
      result[journalName].push(rp);
    });
    return result;
  };
  useEffect(() => {
    getUserById(userId).then((res) => setUser(res));
    readReviewProofs({ user: userId }).then((res) => {
      setReviewProofs(res.results);
      return Promise.all(res.results.map((reviewProof) => verifyDerivedProof(formatDBreviewProof(reviewProof)))).then(
        (verifyResults) => {
          console.log(verifyResults);
          const tempVerifiedProofs = res.results.map((rp, i) => ({
            ...rp,
            verified: verifyResults[i].verified,
          }));
          setVerifiedReviewProofs(tempVerifiedProofs.filter((rp) => rp.verified));
          setUnverifiedReviewProofs(tempVerifiedProofs.filter((rp) => !rp.verified));
          setReviewsByJournalName(groupReviewsByJournalName(tempVerifiedProofs));
        }
      );
    });
  }, []);
  if (!user || !verfiedReviewProofs || !unverfiedReviewProofs || !reviewProofs || !reviewsByJournalName) {
    return 'Loading';
  }
  const journalBoxes = [];
  Object.keys(reviewsByJournalName).forEach((journalName) => {
    journalBoxes.push(<JournalBox journalName={journalName} reviews={reviewsByJournalName[journalName]} />);
  });

  return (
    <>
      <main className='profile-page'>
        <section className='relative py-160'>
          <div className='container mx-auto px-4'>
            <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg'>
              <div className='px-6'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                    <div className='relative'>
                      <img
                        alt='...'
                        src={require('assets/img/team-2-800x800.jpg').default}
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                      />
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center'>
                    <div className='py-6 px-3 mt-32 sm:mt-0'>
                      <button
                        className='bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                        type='button'
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                    <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          {verfiedReviewProofs.length}
                        </span>
                        <span className='text-sm text-blueGray-400'>Verified Reviews</span>
                      </div>
                      <div className='mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          {unverfiedReviewProofs.length}
                        </span>
                        <span className='text-sm text-blueGray-400'>Unverified Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='text-center mt-12'>
                  <h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2'>
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className='mb-2 text-blueGray-600'>
                    <i className='fas fa-university mr-2 text-lg text-blueGray-400' />
                    {user.institution}
                  </div>
                </div>
                <div className='mt-10 py-10 border-t border-blueGray-200'>
                  <div className='flex flex-wrap'>
                    <div className='w-full'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600  my-2'>
                        Peer Reviews in Journals{' '}
                      </span>
                      <div className='flex flex-wrap'>{journalBoxes}</div>
                    </div>
                  </div>
                </div>
                <div className='mt-10 py-10 border-t border-blueGray-200'>
                  <div className='flex flex-wrap'>
                    <div className='w-full'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600  my-2'>
                        Peer Reviews by Month{' '}
                      </span>
                      <div className='flex flex-wrap'>
                        <ReviewChart reviewProofs={verfiedReviewProofs} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-10 py-10 border-t border-blueGray-200'>
                  <div className='flex flex-wrap'>
                    <div className='w-full'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600 my-2'>
                        All Peer Reviews
                      </span>
                      <ReviewsTable reviewProofs={reviewProofs} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
