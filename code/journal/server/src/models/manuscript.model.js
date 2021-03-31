const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const manuscriptSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
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
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
manuscriptSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Manuscript = mongoose.model('Manuscript', manuscriptSchema);

module.exports = Manuscript;
