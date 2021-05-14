const { BbsBlsSignatureProof2020 } = require('@mattrglobal/jsonld-signatures-bbs');
const { documentLoaders } = require('jsonld');
const { extendContextLoader, purposes, verify } = require('jsonld-signatures');
const securityContexts = require('jsonld-signatures/lib/contexts');
const exampleControllerDoc = require('../config/controllerDocument.json');
const keyPairOptions = require('../config/keypair.json');

// cached contexts
const peerReviewSchema = require('../config/contexts/PeerReview.json');
const vc_v1 = require('../config/contexts/vc-v1.json');
const security_v3_unstable = require('../config/contexts/security-v3-unstable.json');
const bbsContext = require('../config/contexts/bbs.json');

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

async function verifyDerivedProof(derivedProof) {
  console.log(derivedProof.proof.type);
  console.log(derivedProof.proof.proofPurpose);
  const verified = await verify(derivedProof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader,
  });
  return verified;
}

module.exports = {
  verifyDerivedProof,
};
