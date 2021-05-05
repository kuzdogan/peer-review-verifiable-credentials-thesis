const mongoose = require('mongoose');
const httpStatus = require('http-status');
const {
  BbsBlsSignature2020,
  Bls12381G2KeyPair,
  BbsBlsSignatureProof2020,
  deriveProof,
} = require('@mattrglobal/jsonld-signatures-bbs');
const { documentLoaders } = require('jsonld');
const { extendContextLoader, purposes, verify, sign } = require('jsonld-signatures');
const securityContexts = require('jsonld-signatures/lib/contexts');
const { getReviewById } = require('./review.service');
const controller = require('../config/PRCredentials/controllerDocument.json');
const ApiError = require('../utils/ApiError');
const keyPairOptions = require('../config/PRCredentials/keypair.json');

// cached contexts
const peerReviewSchema = require('../config/PRCredentials/contexts/PeerReview.json');
const vc_v1 = require('../config/PRCredentials/contexts/vc-v1.json');
const security_v3_unstable = require('../config/PRCredentials/contexts/security-v3-unstable.json');
const bbsContext = require('../config/PRCredentials/contexts/bbs.json');

const PEER_REVIEW_CONTEXT_URL =
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json';
const VC_CONTEXT_URL = 'https://www.w3.org/2018/credentials/v1';
const BBS_CONTEXT_URL = 'https://w3id.org/security/bbs/v1';
const API_URL = 'http://localhost:3000/v1/auth';

// cached contexts
const contexts = {
  'did:example:489398593#test': keyPairOptions,
  'did:example:489398593': controller,
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json': peerReviewSchema,
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
    id: `${API_URL}/reviews/${review.id}/credential`,
    type: ['VerifiableCredential', 'PeerReviewCredential'],
    description: 'Peer Review Credential version 0.1',
    issuer: controller.id,
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: `${API_URL}/users/${review.id}`,
      type: 'PeerReview',
      name: `Peer Review: ${review.manuscript.title}`,
      author: {
        type: 'PeerReviewAuthor',
        id: `${API_URL}/users/${review.reviewer.id}`, // or DID, or ORCID
        givenName: review.reviewer.name, // TODO: Fix user model as givenname familyname
        familyName: review.reviewer.name,
        email: review.reviewer.email,
      },
      journal: 'Journal X',
    },
  };

  console.log(jsonld);
  return jsonld;
}

async function issuePeerReviewCredential(reviewId) {
  const unsignedDoc = await generateUnsignedCredential(reviewId);
  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  console.log('Generated KeyPair');
  const suite = new BbsBlsSignature2020({ key: keyPair });
  console.log('Generated key suite');
  const signedVC = await sign(unsignedDoc, {
    purpose: new purposes.AssertionProofPurpose(),
    suite,
    documentLoader,
  });
  console.log(signedVC);
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
