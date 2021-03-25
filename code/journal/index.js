const { BbsBlsSignature2020, Bls12381G2KeyPair } = require("@mattrglobal/jsonld-signatures-bbs");
const vc = require('vc-js');
const keyPairOptions = require('./keypair.json')
const { extendContextLoader } = require('jsonld-signatures');
const { documentLoaders } = require("jsonld");

_main()

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const customDocLoader = (url) => {
  return documentLoaders.node()(url);
};
const documentLoader = extendContextLoader(customDocLoader);


async function _main() {

  // Sample unsigned credential
  const credential = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": "https://example.com/credentials/1872",
    "type": ["VerifiableCredential", "AlumniCredential"],
    "issuer": "https://example.edu/issuers/565049",
    "issuanceDate": "2010-01-01T19:23:24Z",
    "credentialSubject": {
      "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
      "alumniOf": "Example University"
    }
  };


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