const Joi = require('joi');
const { objectId, statusType } = require('./custom.validation');

const createManuscript = {
  body: Joi.object().keys({
    author: Joi.string().custom(objectId),
    reviewers: Joi.array().items(Joi.string().custom(objectId)),
    title: Joi.string().required(),
    abstract: Joi.string().required(),
    content: Joi.string().required(),
    submissionDate: Joi.date(),
    status: Joi.string().custom(statusType),
  }),
};

const getManuscripts = {
  query: Joi.object().keys({
    author: Joi.string().custom(objectId),
    status: Joi.string().custom(statusType),
    populate: Joi.string(),
  }),
};

const getManuscript = {
  params: Joi.object().keys({
    manuscriptId: Joi.string().custom(objectId),
  }),
};

const updateManuscript = {
  params: Joi.object().keys({
    manuscriptId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      author: Joi.string().custom(objectId),
      reviewers: Joi.array().items(Joi.string().custom(objectId)),
      title: Joi.string().required(),
      abstract: Joi.string(),
      content: Joi.string(),
      submissionDate: Joi.date(),
      status: Joi.string().custom(statusType),
    })
    .min(1),
};

const deleteManuscript = {
  params: Joi.object().keys({
    manuscriptId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createManuscript,
  getManuscripts,
  getManuscript,
  updateManuscript,
  deleteManuscript,
};
