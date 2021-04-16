const { status } = require('../config/manuscripts');
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

const statusType = (value, helpers) => {
  if (Object.values(status).includes(value)) {
    return value;
  }
  return helpers.message('incorrect manuscript status type');
};

module.exports = {
  objectId,
  password,
  recommendationType,
  statusType,
};
