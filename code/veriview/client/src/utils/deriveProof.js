import { BbsBlsSignature2020, BbsBlsSignatureProof2020, deriveProof } from '@mattrglobal/jsonld-signatures-bbs';
import { documentLoaders } from 'jsonld';
import { extendContextLoader, purposes, verify } from 'jsonld-signatures';
import securityContexts from 'jsonld-signatures/lib/contexts';
import exampleControllerDoc from './controllerDocument.json';
import keyPairOptions from './keypair.json';

// cached contexts
const peerReviewSchema = require('./contexts/PeerReview.json');
const vc_v1 = require('./contexts/vc-v1.json');
const security_v3_unstable = require('./contexts/security-v3-unstable.json');
const bbsContext = require('./contexts/bbs.json');

// cached contexts
const contexts = {
  'did:example:489398593#test': keyPairOptions,
  'did:example:489398593': exampleControllerDoc,
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json': peerReviewSchema,
  'https://www.w3.org/2018/credentials/v1': vc_v1,
  ...securityContexts, // security-v1, security-v2
  'https://w3id.org/security/v3-unstable': security_v3_unstable,
  'https://w3id.org/security/bbs/v1': bbsContext,
};

const customDocLoader = (url) => {
  const context = contexts[url];
  console.log(`Requesting + ${url}`);
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

export async function selectiveDisclose(signedDocument, revealDocument) {
  const derivedProof = await deriveProof(signedDocument, revealDocument, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader,
  });
  console.log(JSON.stringify(derivedProof, null, 2));
  return derivedProof;
}

export async function verifySelectiveDisclosedCredential(derivedProof) {
  const verified = await verify(derivedProof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return verified;
}

export async function verifyPeerReviewCredential(signedCredential) {
  console.log('Verifying Credential');
  const isVerified = await verify(signedCredential, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return isVerified;
}
