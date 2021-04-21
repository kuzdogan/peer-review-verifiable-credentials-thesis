const mongoose = require('mongoose');
const { reviewTaskStatuses } = require('../config/reviewTasks');
const { paginate, toJSON } = require('./plugins');

const reviewTaskSchema = mongoose.Schema(
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
    review: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Review',
      required: false,
    },
    status: {
      type: String,
      enum: reviewTaskStatuses,
      default: reviewTaskStatuses.PROPOSED,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
reviewTaskSchema.plugin(toJSON);
reviewTaskSchema.plugin(paginate);

const ReviewTask = mongoose.model('ReviewTask', reviewTaskSchema);

module.exports = ReviewTask;
