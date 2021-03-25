const { BbsBlsSignature2020, Bls12381G2KeyPair } = require("@mattrglobal/jsonld-signatures-bbs");
const vc = require('vc-js');
const keyPairOptions = require('./keypair.json')
const { extendContextLoader } = require('jsonld-signatures');
const { documentLoaders } = require("jsonld");
const peerReviewSchema = require('../PeerReview.json')

_main()

const documents = {
  "https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReviewVC.jsonld": peerReviewSchema
};

const customDocLoader = (url) => {
  const context = documents[url];

  if (context) {
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

  // Sample unsigned credential
  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://raw.githubusercontent.com/kuzdogan/peer-review-verifiable-credentials-thesis/main/code/PeerReviewVC.jsonld"
    ],
    "id": "https://peerreview.org/reviews/1234",
    "type": [
      "VerifiableCredential",
      "PeerReviewCredential"
    ],
    "description": "Peer Review Credential for the article Tourette syndrome research highlights from 2018",
    "issuer": "https://f1000research.org/.well-known/did.jsonld",
    "issuanceDate": "2017-12-05T14:27:42Z",
    "credentialSubject": {
      "id": "doi:10.1000/182",
      "type": "PeerReview",
      "name": "Peer Review: Tourette syndrome research highlights from 2018",
      "author": {
        "type": "PeerReviewAuthor",
        "id": "orcid:0000-0002-3037-3890",
        "givenName": "Marc",
        "familyName": "Lavoie",
        "email": "marc@lavoie.net"
      }
    }
  }



  const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
  console.log('Generated KeyPair');
  // console.log(keyPair);
  const suite = new BbsBlsSignature2020({ key: keyPair });
  console.log('Generated key suite');
  // console.log(suite);
  const signedVC = await vc.issue({ credential, suite, documentLoader });
  console.log(JSON.stringify(signedVC, null, 2));
}



// function issuePeerReview(reviewDoc) {
//   //Import the example key pair
//   const keyPair = await new Bls12381G2KeyPair(keyPairOptions);
//   //Sign the input document
//   const signedDocument = await sign(inputDocument, {
//     suite: new BbsBlsSignature2020({ key: keyPair }),
//     purpose: new purposes.AssertionProofPurpose(),
//     documentLoader
//   });
// }