const mongoose = require('mongoose');
const httpStatus = require('http-status');
const {
  BbsBlsSignature2020,
  Bls12381G2KeyPair,
  BbsBlsSignatureProof2020,
  deriveProof,
} = require('@mattrglobal/jsonld-signatures-bbs');
const { generateBls12381G2KeyPair } = require('@mattrglobal/bbs-signatures');
const { documentLoaders } = require('jsonld');
const { extendContextLoader, purposes, verify, sign } = require('jsonld-signatures');
const securityContexts = require('jsonld-signatures/lib/contexts');
const { getReviewById } = require('./review.service');
// const controller = require('../config/PRCredentials/did.json');
// const controller = require('../config/PRCredentials/controllerDocument.json');
const ApiError = require('../utils/ApiError');
const keyPairOptions = require('../config/PRCredentials/keypairDID.json');
// const keyPairOptions = require('../config/PRCredentials/keypair.json');

// cached contexts
const peerReviewSchema = require('../config/PRCredentials/contexts/PeerReview.json');
const vc_v1 = require('../config/PRCredentials/contexts/vc-v1.json');
const security_v3_unstable = require('../config/PRCredentials/contexts/security-v3-unstable.json');
const bbsContext = require('../config/PRCredentials/contexts/bbs.json');

const PEER_REVIEW_CONTEXT_URL =
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json';
const VC_CONTEXT_URL = 'https://www.w3.org/2018/credentials/v1';
const BBS_CONTEXT_URL = 'https://w3id.org/security/bbs/v1';
const API_URL = 'http://localhost:3000';

const to_b58 = function (
  B, // Uint8Array raw byte input
  A // Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
  const d = []; // the array for storing the stream of base58 digits
  let s = ''; // the result string variable that will be returned
  let i; // the iterator variable for the byte input
  let j; // the iterator variable for the base58 digit array (d)
  let c; // the carry amount variable that is used to overflow from the current base58 digit to the next base58 digit
  let n; // a temporary placeholder variable for the current base58 digit
  for (i in B) {
    // loop through each byte in the input stream
    (j = 0), // reset the base58 digit iterator
      (c = B[i]); // set the initial carry amount equal to the current byte amount
    s += c || s.length ^ i ? '' : 1; // prepend the result string with a "1" (0 in base58) if the byte stream is zero and non-zero bytes haven't been seen yet (to ensure correct decode length)
    while (j in d || c) {
      // start looping through the digits until there are no more digits and no carry amount
      n = d[j]; // set the placeholder for the current base58 digit
      n = n ? n * 256 + c : c; // shift the current base58 one byte and add the carry amount (or just add the carry amount if this is a new digit)
      c = (n / 58) | 0; // find the new carry amount (floored integer of current digit divided by 58)
      d[j] = n % 58; // reset the current base58 digit to the remainder (the carry amount will pass on the overflow)
      j++; // iterate to the next base58 digit
    }
  }
  while (j--)
    // since the base58 digits are backwards, loop through them in reverse order
    s += A[d[j]]; // lookup the character associated with each base58 digit
  return s; // return the final base58 string
};
// const keyPair = generateBls12381G2KeyPair().then((keyPair) => {
//   const keyPairPublicStr = to_b58(keyPair.publicKey, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
//   console.log(keyPairPublicStr);
//   const keyPairPrivateStr = to_b58(keyPair.secretKey, '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
//   console.log(keyPairPrivateStr);
// });

// cached contexts
const contexts = {
  // 'did:example:489398593#test': keyPairOptions,
  // 'did:example:489398593': controller,
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json':
    peerReviewSchema,
  'https://www.w3.org/2018/credentials/v1': vc_v1,
  ...securityContexts, // security-v1, security-v2
  'https://w3id.org/security/v3-unstable': security_v3_unstable,
  'https://w3id.org/security/bbs/v1': bbsContext,
};

const customDocLoader = (url) => {
  const context = contexts[url];

  if (context) {
    console.log(`Found cached ${url}, not requesting`);
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }
  return documentLoaders.node()(url);
};
const documentLoader = extendContextLoader(customDocLoader);

async function generateUnsignedCredential(reviewId) {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  const jsonld = {
    '@context': [VC_CONTEXT_URL, PEER_REVIEW_CONTEXT_URL, BBS_CONTEXT_URL],
    id: `http://journalx.test/reviews/${review.id}/credential`,
    type: ['VerifiableCredential', 'PeerReviewCredential'],
    name: 'Peer Review Credential version 0.1',
    description: 'A Verifiable Credential representing a peer review that is done for a scholarly article.',
    issuer: keyPairOptions.controller,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: `http://journalx.test/users/${review.id}`,
      type: 'PeerReview',
      title: review.title,
      content: review.content,
      reviewDate: review.submissionDate.toISOString(),
      competingInterestStatement: review.competingInterestStatement,
      journal: {
        id: 'http://journalx.test/',
        name: 'International Journal of X',
        issn: '2046-1402',
      },
      manuscript: {
        id: `http://journalx.test/manuscripts/${review.manuscript.id}`,
        title: review.manuscript.title,
        abstract: review.manuscript.abstract,
      },
      author: {
        type: 'PeerReviewAuthor',
        id: review.reviewer.orcid
          ? `orcid:${review.reviewer.orcid}`
          : `http://journalx.testz/reviewers/${review.reviewer.id}`, // or DID, or ORCID
        givenName: review.reviewer.firstName,
        familyName: review.reviewer.lastName,
        email: review.reviewer.email,
        institution: review.reviewer.institution,
      },
    },
  };

  return jsonld;
}

async function issuePeerReviewCredential(reviewId) {
  const unsignedDoc = await generateUnsignedCredential(reviewId);
  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  const suite = new BbsBlsSignature2020({ key: keyPair });
  const signedVC = await sign(unsignedDoc, {
    purpose: new purposes.AssertionProofPurpose(),
    suite,
    documentLoader,
  });
  return signedVC;
}

async function verifyPeerReviewCredential(signedCredential) {
  console.log('Verifying Credential');
  const isVerified = await verify(signedCredential, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  console.log(isVerified);
  return isVerified;
}

module.exports = {
  generateUnsignedCredential,
  issuePeerReviewCredential,
};
