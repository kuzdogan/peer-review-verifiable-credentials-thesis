const httpStatus = require('http-status');
const { ReviewProof } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create ReviewProof
 * @param {Object} reviewProofBody
 * @returns {Promise<ReviewProof>}
 */
const createReviewProof = async (reviewProofBody, user) => {
  const reviewProof = await ReviewProof.create({ ...reviewProofBody, user: user._id });
  return reviewProof;
};

/**
 * Query for reviewProofs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReviewProofs = async (filter, options) => {
  const reviewProofs = await ReviewProof.paginate(filter, options);
  return reviewProofs;
};

/**
 * Get reviewProof by id
 * @param {ObjectId} id
 * @returns {Promise<ReviewProof>}
 */
const getReviewProofById = async (id) => {
  return ReviewProof.findById(id).populate('user');
};

const getReviewProofByIdUnpopulated = async (id) => {
  return ReviewProof.findById(id);
};

// /**
//  * Update review by id
//  * @param {ObjectId} reviewId
//  * @param {Object} updateBody
//  * @returns {Promise<Review>}
//  */
// const updateReviewById = async (reviewId, updateBody) => {
//   const review = await getReviewById(reviewId);
//   if (!review) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
//   }
//   Object.assign(review, updateBody);
//   await review.save();
//   return review;
// };

/**
 * Delete reviewProof by id
 * @param {ObjectId} reviewProofId
 * @returns {Promise<ReviewProof>}
 */
const deleteReviewProofById = async (reviewProofId) => {
  const reviewProof = await getReviewProofById(reviewProofId);
  if (!reviewProof) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ReviewProof not found');
  }
  await reviewProof.remove();
  return reviewProof;
};

module.exports = {
  createReviewProof,
  queryReviewProofs,
  getReviewProofById,
  getReviewProofByIdUnpopulated,
  // updateReviewById,
  deleteReviewProofById,
};
