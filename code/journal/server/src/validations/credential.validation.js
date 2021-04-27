const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getCredential = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getCredential,
};
