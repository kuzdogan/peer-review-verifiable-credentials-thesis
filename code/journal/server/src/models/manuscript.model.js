const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

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
manuscriptSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Manuscript = mongoose.model('Manuscript', manuscriptSchema);

module.exports = Manuscript;
