const Joi = require('joi');
const { objectId, reviewTaskStatusType, reviewTaskResponseType, recommendationType } = require('./custom.validation');

const createReviewTask = {
  body: Joi.object().keys({
    reviewer: Joi.string().custom(objectId).required(),
    manuscript: Joi.string().custom(objectId).required(),
    deadline: Joi.date().required(),
  }),
};

const getReviewTasks = {
  query: Joi.object().keys({
    reviewer: Joi.string().custom(objectId),
    manuscript: Joi.string().custom(objectId),
    status: Joi.string().custom(reviewTaskStatusType),
    populate: Joi.string(),
  }),
};

const getReviewTask = {
  params: Joi.object().keys({
    reviewTaskId: Joi.string().custom(objectId),
  }),
};

const submitReviewTask = {
  params: Joi.object().keys({
    reviewTaskId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    review: Joi.object().keys({
      content: Joi.string().required(),
      recommendation: Joi.string().required().custom(recommendationType),
      submissionDate: Joi.date(),
    }),
  }),
};

const respondReviewTask = {
  params: Joi.object().keys({
    reviewTaskId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    response: Joi.string().required().custom(reviewTaskResponseType),
  }),
};

const updateReviewTask = {
  params: Joi.object().keys({
    reviewTaskId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      review: Joi.string().custom(objectId),
      status: Joi.string().custom(reviewTaskStatusType),
      deadline: Joi.date(),
      completedDate: Joi.date(),
    })
    .min(1),
};

const deleteReviewTask = {
  params: Joi.object().keys({
    reviewTaskId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReviewTask,
  getReviewTasks,
  getReviewTask,
  respondReviewTask,
  updateReviewTask,
  submitReviewTask,
  deleteReviewTask,
};
