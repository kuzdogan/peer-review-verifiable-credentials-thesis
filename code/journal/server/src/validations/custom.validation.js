const { manuscriptStatuses } = require('../config/manuscripts');
const { reviewTaskStatuses, reviewTaskResponses } = require('../config/reviewTasks');
const { recommendationTypes } = require('../config/reviews');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const recommendationType = (value, helpers) => {
  if (Object.values(recommendationTypes).includes(value)) {
    return value;
  }
  return helpers.message('incorrect review reccomentation type');
};

const manuscriptStatusType = (value, helpers) => {
  if (Object.values(manuscriptStatuses).includes(value)) {
    return value;
  }
  return helpers.message('incorrect manuscript status type');
};

const reviewTaskStatusType = (value, helpers) => {
  if (Object.values(reviewTaskStatuses).includes(value)) {
    return value;
  }
  return helpers.message('incorrect review task status type');
};

const reviewTaskResponseType = (value, helpers) => {
  if (Object.values(reviewTaskResponses).includes(value)) {
    return value;
  }
  return helpers.message('incorrect review task response type');
};

module.exports = {
  objectId,
  password,
  recommendationType,
  manuscriptStatusType,
  reviewTaskStatusType,
  reviewTaskResponseType,
};
