const httpStatus = require('http-status');
const { Manuscript } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create manuscript
 * @param {Object} manuscriptBody
 * @returns {Promise<Manuscript>}
 */
const createManuscript = async (manuscriptBody) => {
  const manuscript = await Manuscript.create(
    manuscriptBody.submissionDate ? manuscriptBody : { ...manuscriptBody, submissionDate: new Date() }
  );
  return manuscript;
};

/**
 * Query for manuscripts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryManuscripts = async (filter, options) => {
  const manuscripts = await Manuscript.paginate(filter, options);
  return manuscripts;
};

/**
 * Get manuscript by id
 * @param {ObjectId} id
 * @returns {Promise<Manuscript>}
 */
const getManuscriptById = async (id) => {
  return Manuscript.findById(id);
};

/**
 * Get manuscript by id
 * @param {string} manuscripterId- mongo _id of the manuscript
 * @returns {Promise<Manuscript>}
 */
const getManuscriptByAuthorId = async (authorId) => {
  return Manuscript.findOne({ author: authorId });
};

/**
 * Update manuscript by id
 * @param {ObjectId} manuscriptId
 * @param {Object} updateBody
 * @returns {Promise<Manuscript>}
 */
const updateManuscriptById = async (manuscriptId, updateBody) => {
  const manuscript = await getManuscriptById(manuscriptId);
  if (!manuscript) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manuscript not found');
  }
  Object.assign(manuscript, updateBody);
  await manuscript.save();
  return manuscript;
};

/**
 * Delete manuscript by id
 * @param {ObjectId} manuscriptId
 * @returns {Promise<Manuscript>}
 */
const deleteManuscriptById = async (manuscriptId) => {
  const manuscript = await getManuscriptById(manuscriptId);
  if (!manuscript) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manuscript not found');
  }
  await manuscript.remove();
  return manuscript;
};

module.exports = {
  createManuscript,
  queryManuscripts,
  getManuscriptById,
  getManuscriptByAuthorId,
  updateManuscriptById,
  deleteManuscriptById,
};
