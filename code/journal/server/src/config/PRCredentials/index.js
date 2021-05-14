const {
  BbsBlsSignature2020,
  Bls12381G2KeyPair,
  BbsBlsSignatureProof2020,
  deriveProof,
} = require('@mattrglobal/jsonld-signatures-bbs');
const { extendContextLoader, purposes, verify, sign } = require('jsonld-signatures');
const { documentLoaders } = require('jsonld');
const securityContexts = require('jsonld-signatures/lib/contexts');
const keyPairOptions = require('./keypair.json');
const examplePR = require('./ExamplePeerReview.json');
const exampleControllerDoc = require('./controllerDocument.json');
const deriveProofFrame = require('./deriveProofFrame.json');

// cached contexts
const peerReviewSchema = require('./contexts/PeerReview.json');
const vc_v1 = require('./contexts/vc-v1.json');
const security_v3_unstable = require('./contexts/security-v3-unstable.json');
const bbsContext = require('./contexts/bbs.json');

// _main();

// cached contexts
const contexts = {
  'did:example:489398593#test': keyPairOptions,
  'did:example:489398593': exampleControllerDoc,
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

async function _main() {
  try {
    const signedVC = await issuePeerReview(examplePR);
    console.log(signedVC);
    const isVerified = await verifyPeerReview(signedVC);
    console.log(isVerified);
    const selectiveDisclosedCredential = await selectiveDisclose(signedVC, deriveProofFrame);
    // selectiveDisclosedCredential.proof.nonce = 'x' + selectiveDisclosedCredential.proof.nonce.slice(1) // break the proof
    console.log(selectiveDisclosedCredential);

    const isDerivedCredentialVerified = await verifySelectiveDisclosedCredential(selectiveDisclosedCredential);
    console.log(isDerivedCredentialVerified);
  } catch (err) {
    console.log('Error issuing credential');
    console.error(err);
  }
}

async function verifyPeerReview(signedCredential) {
  console.log('Verifying Credential');
  const isVerified = await verify(signedCredential, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return isVerified;
}

async function issuePeerReview(unsignedCredential) {
  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  console.log('Generated KeyPair');
  const suite = new BbsBlsSignature2020({ key: keyPair });
  console.log('Generated key suite');
  const signedVC = await sign(unsignedCredential, {
    purpose: new purposes.AssertionProofPurpose(),
    suite,
    documentLoader,
  });
  return signedVC;
}

async function selectiveDisclose(signedDocument, revealDocument) {
  const derivedProof = await deriveProof(signedDocument, revealDocument, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader,
  });
  return derivedProof;
}

const temp = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json',
    'https://w3id.org/security/bbs/v1',
  ],
  id: 'http://localhost:3000/reviews/609ac62276bfdce844d8ee6c/credential',
  type: ['PeerReviewCredential', 'VerifiableCredential'],
  description: 'A Verifiable Credential representing a peer review that is done for a scholarly article.',
  name: 'Peer Review Credential version 0.1',
  credentialSubject: {
    id: 'http://localhost:3000/users/609ac62276bfdce844d8ee6c',
    type: 'PeerReview',
    competingInterestStatement: 'No competing interests',
    author: {
      id: 'orcid:0000-0001-7223-2669',
      type: 'PeerReviewAuthor',
      email: 'alice@test.com',
    },
    journal: {
      id: 'http://localhost:3000',
      issn: '2046-1402',
      name: 'International Journal of X',
    },
  },
  issuanceDate: '2021-05-11T23:28:18.849Z',
  issuer: 'did:example:489398593',
  proof: {
    type: 'BbsBlsSignatureProof2020',
    created: '2021-05-11T23:28:18Z',
    nonce: 'NxeHm6Dx0rEjVf8LguPDssE55ZhQryDnN9sbwG6Famiq/Jq018/Vye9dNlmQmKFmJpM=',
    proofPurpose: 'assertionMethod',
    proofValue:
      'ABwJbj/PtfHJmdtKn1wO2EwiYtNGvSuVJoW0JtNYORi2fTU0Ydd+JzT49mAteNzAkLcwjRxZrqM9rAQBTrZOOU7YOrEYZa2R7GmLhaVehsVc96aMiv1IENPJn4yhoI4WpKcuck+Qoy2/dPiGHRvP+Syx2r2liUUGJ49J0ZFKbZ0usJA6fYpQyiJddHgCqrHJYwELtW9PAAAAdIXMjNQ+rkc1inQhpevDRe8Fqr4A0N7sKMNM4W86+abmc2C7j0nWD6x68TD1WwDaGwAAAAI4CmOhzwpdq/MGJmBy7Aix2B8eD+RBpXMPe746R7EnKz0Msj81WCfkMcCWop5w+ZJhyn4gjZh+BAFKpgRx9Eh4raqJKa9Er7krTkL82tDuBR08Kq2KHPcBnpt7e05NFU+RizGVKzjnveE/x9J40bNKAAAACxoQWTRN2YuteVp0niJhzusD2oAcdQmuJQZwBkxKepnHHnTrukZoSh8oNUxVxhhphMNg8WnjxVSBpjM8cszKJBIUD0AmrHfCWMs7D0QrZAhmFpvL2h9O+qrdrUb8q1rmvW41u6JiYpFJyJsl/qKRmMJTdZx1qKAAN3wtvaVXXPA+WWNbByTimNUREAD3UOBPsq5K+hm3csQ5vtIUaMfn8vAzyPwGhhicyhgnjc1UR1pAxBqoTeBe8TecdbnhomaFGQXo8K6t2Qr26eGQU1Q50bpUPoICQJUP1seA6BrKJTJJCR6jTccJP9Z5IBKHWoGRF/VwOzXCu4nq8223lA+n09ZUbr39AsrLeNjgo9h7wtfkkoPyBbhoRRy+BpPuZc6DeB7YOCiHQZKbiZziRQQ/2K/Ka90Lwy7wLiJcTwSCnKGBEDh5x5FDZc7E5qK92Eo9djIhD5Cy0zYSAwDF+drM/z4=',
    verificationMethod: 'did:example:489398593#test',
  },
};

async function verifySelectiveDisclosedCredential(derivedProof) {
  const verified = await verify(temp, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  console.log(verified);
  return verified;
}

verifySelectiveDisclosedCredential();
