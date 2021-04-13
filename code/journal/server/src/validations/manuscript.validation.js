const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createManuscript = {
  body: Joi.object().keys({
    author: Joi.string().required().custom(objectId),
    abstract: Joi.string().required(),
    content: Joi.string().required(),
    submissionDate: Joi.date(),
  }),
};

const getManuscripts = {
  query: Joi.object().keys({
    author: Joi.string().custom(objectId),
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
      abstract: Joi.string(),
      content: Joi.string(),
      submissionDate: Joi.date(),
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
