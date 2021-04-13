const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const manuscriptValidation = require('../../validations/manuscript.validation');
const manuscriptController = require('../../controllers/manuscript.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('postManuscript'), validate(manuscriptValidation.createManuscript), manuscriptController.createManuscript)
  .get(auth('getManuscripts'), validate(manuscriptValidation.getManuscripts), manuscriptController.getManuscripts);

router
  .route('/:manuscriptId')
  .get(auth('getManuscripts'), validate(manuscriptValidation.getManuscript), manuscriptController.getManuscript)
  .patch(auth('manageManuscripts'), validate(manuscriptValidation.updateManuscript), manuscriptController.updateManuscript)
  .delete(auth('manageManuscripts'), validate(manuscriptValidation.deleteManuscript), manuscriptController.deleteManuscript);

module.exports = router;
