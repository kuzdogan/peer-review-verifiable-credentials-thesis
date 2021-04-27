const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService, reviewTaskService } = require('../services');
const { reviewTaskStatuses } = require('../config/reviewTasks');

const createReview = catchAsync(async (req, res) => {
  const reviewTask = await reviewTaskService.getReviewTaskById(req.body.reviewTask);
  const review = await reviewService.createReview({ ...req.body, manuscript: reviewTask.manuscript }, req.user);
  await reviewTaskService.updateReviewTaskById(req.body.reviewTask, {
    review: review.id,
    status: reviewTaskStatuses.SUBMITTED,
    completedDate: new Date(),
  });
  res.status(httpStatus.CREATED).send(review);
});

const getReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['reviewer']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await reviewService.queryReviews(filter, options);
  res.send(result);
});

const getReview = catchAsync(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  res.send(review);
});

const updateReview = catchAsync(async (req, res) => {
  const review = await reviewService.updateReviewById(req.params.reviewId, req.body);
  res.send(review);
});

const deleteReview = catchAsync(async (req, res) => {
  await reviewService.deleteReviewById(req.params.reviewId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
