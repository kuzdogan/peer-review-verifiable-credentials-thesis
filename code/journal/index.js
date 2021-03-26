const { BbsBlsSignature2020, Bls12381G2KeyPair } = require("@mattrglobal/jsonld-signatures-bbs");
const vc = require('vc-js');
const keyPairOptions = require('./keypair.json')
const { extendContextLoader } = require('jsonld-signatures');
const { documentLoaders } = require("jsonld");
const peerReviewSchema = require('../PeerReview.json');
const examplePR = require('../ExamplePeerReview.json');

// cached contexts
const securityContexts = require('jsonld-signatures/lib/contexts');
const vc_v1 = require('../contexts/vc-v1.json');
const security_v3_unstable = require('../contexts/security-v3-unstable.json');

_main()

const documents = {
  "https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReview.json": peerReviewSchema,
  'https://www.w3.org/2018/credentials/v1': vc_v1,
  ...securityContexts,
  'https://w3id.org/security/v3-unstable': security_v3_unstable
};

const customDocLoader = (url) => {
  const context = documents[url];

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
  } catch (err) {
    console.log('Error issuing credential');
    console.error(err);
  }
}



async function issuePeerReview(unsignedCredential) {
  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  console.log('Generated KeyPair');
  const suite = new BbsBlsSignature2020({ key: keyPair });
  console.log('Generated key suite');
  const signedVC = await vc.issue({ credential: unsignedCredential, suite, documentLoader });
  return signedVC;
}