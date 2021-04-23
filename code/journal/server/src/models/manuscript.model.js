const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { manuscriptStatuses } = require('../config/manuscripts');

const manuscriptSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewTasks: {
      type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'ReviewTask' }],
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
      enum: manuscriptStatuses,
      required: true,
      default: manuscriptStatuses.PENDING,
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
