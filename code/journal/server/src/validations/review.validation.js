const Joi = require('joi');
const { objectId, recommendationType } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    reviewTask: Joi.string().required().custom(objectId),
    title: Joi.string().allow(''),
    content: Joi.string().required(),
    competingInterestStatement: Joi.string().allow(''),
    recommendation: Joi.string().required().custom(recommendationType),
    submissionDate: Joi.date(),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    populate: Joi.string(),
    reviewer: Joi.string().custom(objectId),
    manuscript: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      reviewer: Joi.string().custom(objectId),
      manuscript: Joi.string().custom(objectId),
      title: Joi.string(),
      content: Joi.string(),
      competingInterestStatement: Joi.string(),
      recommendation: Joi.string().custom(recommendationType),
      submissionDate: Joi.date(),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
