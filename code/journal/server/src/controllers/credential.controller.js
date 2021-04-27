const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const credentialService = require('../services/credential.service');
const catchAsync = require('../utils/catchAsync');

const getCredential = catchAsync(async (req, res) => {
  const credential = await credentialService.issuePeerReviewCredential(req.params.reviewId);
  if (!credential) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Credential not found');
  }
  res.set('Content-disposition', `attachment; filename=${req.params.reviewId}.json`);
  res.json(credential);
});

module.exports = { getCredential };
