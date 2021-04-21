const httpStatus = require('http-status');
const { ReviewTask } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create ReviewTask
 * @param {Object} reviewTaskBody
 * @returns {Promise<ReviewTask>}
 */
const createReviewTask = async (reviewTaskBody) => {
  const reviewTask = await ReviewTask.create(reviewTaskBody);
  return reviewTask.populate('reviewer').populate('manuscript');
};

/**
 * Query for ReviewTasks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReviewTasks = async (filter, options) => {
  const reviewTasks = await ReviewTask.paginate(filter, options);
  return reviewTasks;
};

/**
 * Get reviewTask by id
 * @param {ObjectId} id
 * @returns {Promise<reviewTask>}
 */
const getReviewTaskByIdPopulated = async (id) => {
  return ReviewTask.findById(id).populate('reviewer').populate('manuscript').populate('review');
};

/**
 * Get reviewTask by id
 * @param {ObjectId} id
 * @returns {Promise<reviewTask>}
 */
const getReviewTaskById = async (id) => {
  return ReviewTask.findById(id);
};

/**
 * Update reviewTask by id
 * @param {ObjectId} reviewTaskId
 * @param {Object} updateBody
 * @returns {Promise<ReviewTask>}
 */
const updateReviewTaskById = async (reviewTaskId, updateBody) => {
  const reviewTask = await getReviewTaskById(reviewTaskId);
  if (!reviewTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Task not found');
  }
  Object.assign(reviewTask, updateBody);
  await reviewTask.save();
  return reviewTask.populate('reviewer').populate('manuscript').populate('review');
};

/**
 * Delete reviewTask by id
 * @param {ObjectId} reviewTaskId
 * @returns {Promise<ReviewTask>}
 */
const deleteReviewTaskById = async (reviewTaskId) => {
  const reviewTask = await getReviewTaskById(reviewTaskId);
  if (!reviewTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Task not found');
  }
  await reviewTask.remove();
  return reviewTask;
};

module.exports = {
  createReviewTask,
  queryReviewTasks,
  getReviewTaskById,
  getReviewTaskByIdPopulated,
  updateReviewTaskById,
  deleteReviewTaskById,
};
