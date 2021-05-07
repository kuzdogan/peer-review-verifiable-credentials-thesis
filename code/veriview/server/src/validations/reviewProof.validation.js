const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReviewProof = {
  body: Joi.object().keys({
    '@context': Joi.array().items(Joi.string()).required(),
    id: Joi.string().required(),
    type: Joi.array().items(Joi.string()).required(),
    description: Joi.string().required(),
    issuer: Joi.string().required(),
    issuanceDate: Joi.date().required(),
    credentialSubject: Joi.object().keys({
      id: Joi.string().required(),
      type: Joi.string().required(),
      name: Joi.string(),
      journal: Joi.string(),
      author: Joi.object().keys({
        type: Joi.string(),
        id: Joi.string(),
        givenName: Joi.string(),
        familyName: Joi.string(),
        email: Joi.string(),
      }),
    }),
    proof: Joi.object().keys({
      type: Joi.string().required(),
      created: Joi.date().required(),
      nonce: Joi.string().required(),
      proofPurpose: Joi.string().required(),
      proofValue: Joi.string().required(),
      verificationMethod: Joi.string().required(),
    }),
  }),
};

const getReviewProofs = {
  query: Joi.object().keys({
    populate: Joi.string(),
    user: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReviewProof = {
  params: Joi.object().keys({
    reviewProofId: Joi.string().custom(objectId),
  }),
};

// No update due to signatures
// const updateReviewProof = {
//   params: Joi.object().keys({
//     reviewProofId: Joi.string().required().custom(objectId),
//   }),
//   body: Joi.object()
//     .keys({
//       reviewer: Joi.string().custom(objectId),
//       manuscript: Joi.string().custom(objectId),
//       content: Joi.string(),
//       recommendation: Joi.string().custom(recommendationType),
//       submissionDate: Joi.date(),
//     })
//     .min(1),
// };

const deleteReviewProof = {
  params: Joi.object().keys({
    reviewProofId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createReviewProof,
  getReviewProofs,
  getReviewProof,
  // updateReview,
  deleteReviewProof,
};
