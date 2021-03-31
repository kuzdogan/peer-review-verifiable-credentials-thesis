const { BbsBlsSignature2020, Bls12381G2KeyPair, BbsBlsSignatureProof2020, deriveProof } = require("@mattrglobal/jsonld-signatures-bbs");
const { extendContextLoader, purposes, verify, sign } = require('jsonld-signatures');
const { documentLoaders } = require("jsonld");
const keyPairOptions = require('./keypair.json')
const examplePR = require('../ExamplePeerReview.json');
const exampleControllerDoc = require("./controllerDocument.json");
const deriveProofFrame = require('../deriveProofFrame.json');

// cached contexts
const peerReviewSchema = require('../PeerReview.json');
const securityContexts = require('jsonld-signatures/lib/contexts');
const vc_v1 = require('../contexts/vc-v1.json');
const security_v3_unstable = require('../contexts/security-v3-unstable.json');
const bbsContext = require("../contexts/bbs.json");

_main()

// cached contexts
const contexts = {
  "did:example:489398593#test": keyPairOptions,
  "did:example:489398593": exampleControllerDoc,
  "https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json": peerReviewSchema,
  'https://www.w3.org/2018/credentials/v1': vc_v1,
  ...securityContexts, // security-v1, security-v2
  'https://w3id.org/security/v3-unstable': security_v3_unstable,
  "https://w3id.org/security/bbs/v1": bbsContext,
};

const customDocLoader = (url) => {
  const context = contexts[url];

  if (context) {
    console.log(`Found cached ${url}, not requesting`)
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url // this is the actual context URL after redirects
    };
  }
  return documentLoaders.node()(url);
};
const documentLoader = extendContextLoader(customDocLoader);


async function _main() {
  try {
    let signedVC = await issuePeerReview(examplePR);
    console.log(signedVC);
    let isVerified = await verifyPeerReview(signedVC);
    console.log(isVerified);
    let selectiveDisclosedCredential = await selectiveDisclose(signedVC, deriveProofFrame);
    // selectiveDisclosedCredential.proof.nonce = 'x' + selectiveDisclosedCredential.proof.nonce.slice(1) // break the proof
    console.log(selectiveDisclosedCredential);

    let isDerivedCredentialVerified = await verifySelectiveDisclosedCredential(selectiveDisclosedCredential);
    console.log(isDerivedCredentialVerified);
  } catch (err) {
    console.log('Error issuing credential');
    console.error(err);
  }
}





async function verifyPeerReview(signedCredential) {
  console.log('Verifying Credential')
  let isVerified = await verify(signedCredential, {
    suite: new BbsBlsSignature2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
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
    documentLoader
  });
  return signedVC;
}

async function selectiveDisclose(signedDocument, revealDocument) {
  const derivedProof = await deriveProof(signedDocument, revealDocument, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader
  });
  return derivedProof;
}

async function verifySelectiveDisclosedCredential(derivedProof) {
  let verified = await verify(derivedProof, {
    suite: new BbsBlsSignatureProof2020(),
    purpose: new purposes.AssertionProofPurpose(),
    documentLoader
  });
  return verified;
}