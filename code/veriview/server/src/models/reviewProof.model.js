const mongoose = require('mongoose');
const { User } = require('.');
const { paginate, toJSON } = require('./plugins');

const reviewProofSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    '@context': {
      type: [{ type: String }],
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: [{ type: String }],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    issuanceDate: {
      type: Date,
      required: true,
    },
    credentialSubject: {
      id: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      journal: {
        type: String,
      },
      author: {
        type: {
          type: String,
        },
        id: {
          type: String,
        },
        givenName: {
          type: String,
        },
        familyName: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    },
    proof: {
      type: { type: String, required: true },
      created: { type: Date, required: true },
      nonce: { type: String, requred: true },
      proofPurpose: { type: String, required: true },
      proofValue: { type: String, required: true },
      verificationMethod: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reviewProofSchema.plugin(toJSON);
reviewProofSchema.plugin(paginate);

reviewProofSchema.post('remove', (reviewProof) => {
  return User.findOneAndUpdate({ _id: reviewProof.user }, { $pull: { reviewProofs: reviewProof._id } });
});

reviewProofSchema.post('save', (reviewProof) => {
  return User.findOneAndUpdate({ _id: reviewProof.user }, { $push: { reviewProofs: reviewProof._id } });
});

/**
 * @typedef Token
 */
const ReviewProof = mongoose.model('ReviewProof', reviewProofSchema);

module.exports = ReviewProof;
