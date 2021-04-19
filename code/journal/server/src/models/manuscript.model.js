const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { status } = require('../config/manuscripts');

const manuscriptSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewers: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
      default: [],
      required: true,
    },
    reviews: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Review' }],
      default: [],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    submissionDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    status: {
      type: String,
      enum: status,
      required: true,
      default: status.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
manuscriptSchema.plugin(toJSON);
manuscriptSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Manuscript = mongoose.model('Manuscript', manuscriptSchema);

module.exports = Manuscript;
