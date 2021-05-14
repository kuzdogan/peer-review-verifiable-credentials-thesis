const httpStatus = require('http-status');
const verifyService = require('../services/verify.service');

const verifyProof = async (req, res) => {
  const isVerified = await verifyService.verifyDerivedProof(req.body);
  res.status(httpStatus.OK).send(isVerified);
};

module.exports = {
  verifyProof,
};
