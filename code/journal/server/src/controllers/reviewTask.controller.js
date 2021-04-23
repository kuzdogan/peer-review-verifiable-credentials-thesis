const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewTaskService, manuscriptService } = require('../services');
const { reviewTaskResponses, reviewTaskStatuses } = require('../config/reviewTasks');
const { reviewService } = require('../services');

const createReviewTask = catchAsync(async (req, res) => {
  const reviewTask = await reviewTaskService.createReviewTask(req.body);
  await manuscriptService.appendReviewTasksToManuscript(reviewTask.manuscript, reviewTask.id);
  res.status(httpStatus.CREATED).send(reviewTask);
});

const getReviewTasks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['reviewer', 'manuscript', 'review', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await reviewTaskService.queryReviewTasks(filter, options);
  res.send(result);
});

const getReviewTask = catchAsync(async (req, res) => {
  const reviewTask = await reviewTaskService.getReviewTaskByIdPopulated(req.params.reviewTaskId);
  if (!reviewTask) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Task not found');
  }
  res.send(reviewTask);
});

const respondReviewTask = catchAsync(async (req, res) => {
  const { response } = req.body;
  if (response === reviewTaskResponses.ACCEPT) {
    const reviewTask = await reviewTaskService.updateReviewTaskById(req.params.reviewTaskId, {
      status: reviewTaskStatuses.ACCEPTED,
    });
    res.send(reviewTask);
  }
  if (response === reviewTaskResponses.REJECT) {
    const reviewTask = await reviewTaskService.updateReviewTaskById(req.params.reviewTaskId, {
      status: reviewTaskStatuses.REJECTED,
    });
    res.send(reviewTask);
  }
});

const submitReviewTask = catchAsync(async (req, res) => {
  const { reviewTaskId } = req.params;
  const reviewBody = req.body.review;
  const reviewTask = await reviewTaskService.getReviewTaskById(reviewTaskId);
  const review = await reviewService.createReview(
    { manuscript: reviewTask.manuscript, reviewTask: reviewTaskId, ...reviewBody },
    req.user
  );
  const updatedReviewTask = await reviewTaskService.updateReviewTaskById(reviewTaskId, {
    review: review.id,
    status: reviewTaskStatuses.SUBMITTED,
    completedDate: new Date(),
  });
  res.send({ review, reviewTask: updatedReviewTask });
});

const updateReviewTask = catchAsync(async (req, res) => {
  const reviewTask = await reviewTaskService.updateReviewTaskById(req.params.reviewTaskId, req.body);
  res.send(reviewTask);
});

const deleteReviewTask = catchAsync(async (req, res) => {
  await reviewTaskService.deleteReviewTaskById(req.params.reviewTaskId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReviewTask,
  getReviewTasks,
  getReviewTask,
  respondReviewTask,
  updateReviewTask,
  submitReviewTask,
  deleteReviewTask,
};
