const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { manuscriptService } = require('../services');

const createManuscript = catchAsync(async (req, res) => {
  const manuscript = await manuscriptService.createManuscript(req.body, req.user);
  res.status(httpStatus.CREATED).send(manuscript);
});

const getManuscripts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['author', 'status', 'reviewers']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  const result = await manuscriptService.queryManuscripts(filter, options);
  res.send(result);
});

const getManuscript = catchAsync(async (req, res) => {
  const manuscript = await manuscriptService.getManuscriptById(req.params.manuscriptId);
  if (!manuscript) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Manuscript not found');
  }
  res.send(manuscript);
});

const updateManuscript = catchAsync(async (req, res) => {
  const manuscript = await manuscriptService.updateManuscriptById(req.params.manuscriptId, req.body);
  res.send(manuscript);
});

const deleteManuscript = catchAsync(async (req, res) => {
  await manuscriptService.deleteManuscriptById(req.params.manuscriptId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createManuscript,
  getManuscripts,
  getManuscript,
  updateManuscript,
  deleteManuscript,
};
