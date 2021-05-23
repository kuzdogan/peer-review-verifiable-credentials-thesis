const httpStatus = require('http-status');
const verifyService = require('../services/verify.service');

const verifyProof = async (req, res) => {
  const isVerified = await verifyService.verifyDerivedProof(req.body);
  res.status(httpStatus.OK).send(isVerified);
};

const verifyCredential = async (req, res) => {
  const isVerified = await verifyService.verifyPeerReviewCredential(req.body);
  res.status(httpStatus.OK).send(isVerified);
};

const selectiveDisclose = async (req, res) => {
  const derivedProof = await verifyService.selectiveDisclose(req.body.signedDocument, req.body.revealDocument);
  res.status(httpStatus.OK).send(derivedProof);
};

module.exports = {
  verifyProof,
  verifyCredential,
  selectiveDisclose,
};
