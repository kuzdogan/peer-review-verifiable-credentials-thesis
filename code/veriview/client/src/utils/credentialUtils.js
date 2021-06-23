const { BbsBlsSignatureProof2020, BbsBlsSignature2020, deriveProof } = require('@mattrglobal/jsonld-signatures-bbs');
const { documentLoaders } = require('jsonld');
const { extendContextLoader, purposes, verify } = require('jsonld-signatures');
const securityContexts = require('jsonld-signatures/lib/contexts');
const { Resolver } = require('did-resolver');
const { getResolver } = require('web-did-resolver');
// cached contexts
const peerReviewSchema = require('./contexts/PeerReview.json');
const vc_v1 = require('./contexts/vc-v1.json');
const security_v3_unstable = require('./contexts/security-v3-unstable.json');
const bbsContext = require('./contexts/bbs.json');
const didContext = require('./contexts/did.json');

// cached contexts
const contexts = {
  'https://www.w3.org/ns/did/v1': didContext,
  // 'did:web:journalx.test#credentialsKey': didDoc,
  // 'did:web:journalx.test': didDoc,
  'https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json': peerReviewSchema,
  'https://www.w3.org/2018/credentials/v1': vc_v1,
  ...securityContexts, // security-v1, security-v2
  'https://w3id.org/security/v3-unstable': security_v3_unstable,
  'https://w3id.org/security/bbs/v1': bbsContext,
};

const customDocLoader = async (url) => {
  const context = contexts[url];
  if (context) {
    console.log(`CACHED ${url}, not requesting`);
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }
  // Resolve did:web
  if (url.startsWith('did:web')) {
    console.log(`DID Web resolove: ${url}`);
    const webResolver = getResolver();
    const resolver = new Resolver({ ...webResolver });
    const doc = await resolver.resolve(url);
    return {
      contextUrl: null,
      document: doc.didDocument, // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }

  console.log(`FETCHING ${url}`);
  return documentLoaders.node()(url);
};
const documentLoader = extendContextLoader(customDocLoader);

export async function selectiveDisclose(signedDocument, revealDocument) {
  console.log('Deriving proof');
  const derivedProof = await deriveProof(signedDocument, revealDocument, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader,
  });
  return derivedProof;
}

export async function verifyDerivedProof(derivedProof) {
  const verified = await verify(derivedProof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return verified;
}

export async function verifyReviewCredential(signedCredential) {
  const isVerified = await verify(signedCredential, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return isVerified;
}

/**
 * Strip mongo properties from a ReviewProof to be able to verify it
 */
export function formatDBreviewProof(reviewProof) {
  const { createdAt, _id, user, ...originalReviewProof } = reviewProof;
  return originalReviewProof;
}
