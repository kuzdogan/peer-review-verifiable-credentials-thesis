const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewProofService, userService } = require('../services');

const createReviewProof = catchAsync(async (req, res) => {
  const reviewProof = await reviewProofService.createReviewProof(req.body, req.user);
  // const user = await userService.getUserById(req.user.id);
  // const tempReviewProofs = [...user.reviewProofs, reviewProof];
  // await userService.updateUserById(user.id, { reviewProofs: tempReviewProofs });
  res.status(httpStatus.CREATED).send(reviewProof);
});

const getReviewProofs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await reviewProofService.queryReviewProofs(filter, options);
  res.send(result);
});

const getReviewProof = catchAsync(async (req, res) => {
  const reviewProof = await reviewProofService.getReviewProofById(req.params.reviewProofId);
  if (!reviewProof) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ReviewProof not found');
  }
  res.send(reviewProof);
});

// const updateReviewProof = catchAsync(async (req, res) => {
//   const review = await reviewProofService.updateReviewPById(req.params.reviewId, req.body);
//   res.send(review);
// });

const deleteReviewProof = catchAsync(async (req, res) => {
  const reviewProof = await reviewProofService.getReviewProofById(req.params.reviewProofId);
  const user = await userService.getUserById(reviewProof.user.id);
  const tempReviewProofs = user.reviewProofs.filter((e) => e !== req.params.reviewProofId);
  await userService.updateUserById(user.id, { reviewProofs: tempReviewProofs });
  await reviewProofService.deleteReviewProofById(req.params.reviewProofId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReviewProof,
  getReviewProofs,
  getReviewProof,
  // updateReview,
  deleteReviewProof,
};
