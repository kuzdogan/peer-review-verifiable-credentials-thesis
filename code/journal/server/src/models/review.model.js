const mongoose = require('mongoose');
const { recommendationTypes } = require('../config/reviews');
const { paginate, toJSON } = require('./plugins');

const reviewSchema = mongoose.Schema(
  {
    reviewer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    manuscript: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Manuscript',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recommendation: {
      type: String,
      enum: [
        recommendationTypes.ACCEPT,
        recommendationTypes.MAJOR_REVISION,
        recommendationTypes.MINOR_REVISION,
        recommendationTypes.REJECT,
      ],
      required: true,
    },
    submissionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
