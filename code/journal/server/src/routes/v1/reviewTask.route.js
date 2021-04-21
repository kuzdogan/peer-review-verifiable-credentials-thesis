const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewTaskValidiation = require('../../validations/reviewTask.validation');
const reviewTaskController = require('../../controllers/reviewTask.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('postReviewTask'), validate(reviewTaskValidiation.createReviewTask), reviewTaskController.createReviewTask)
  .get(auth('getReviewTasks'), validate(reviewTaskValidiation.getReviewTasks), reviewTaskController.getReviewTasks);

router
  .route('/:reviewTaskId')
  .get(auth('getReviewTasks'), validate(reviewTaskValidiation.getReviewTask), reviewTaskController.getReviewTask)
  .patch(auth('manageReviewTasks'), validate(reviewTaskValidiation.updateReviewTask), reviewTaskController.updateReviewTask)
  .delete(
    auth('manageReviewTasks'),
    validate(reviewTaskValidiation.deleteReviewTask),
    reviewTaskController.deleteReviewTask
  );

router
  .route('/:reviewTaskId/respond')
  .patch(
    auth('respondReviewTasks'),
    validate(reviewTaskValidiation.respondReviewTask),
    reviewTaskController.respondReviewTask
  );

router
  .route('/:reviewTaskId/submit')
  .patch(
    auth('respondReviewTasks'),
    validate(reviewTaskValidiation.submitReviewTask),
    reviewTaskController.submitReviewTask
  );

module.exports = router;
