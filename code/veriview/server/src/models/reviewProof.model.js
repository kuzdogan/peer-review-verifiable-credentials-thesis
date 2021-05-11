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
    name: {
      type: String,
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
      type: String,
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
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      reviewDate: {
        type: String,
      },
      competingInterestStatement: {
        type: String,
      },
      journal: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        issn: {
          type: String,
        },
      },
      manuscipt: {
        id: {
          type: String,
        },
        title: {
          type: String,
        },
        abstract: {
          type: String,
        },
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
        institution: {
          type: String,
        },
      },
    },
    proof: {
      type: { type: String, required: true },
      created: { type: String, required: true },
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
