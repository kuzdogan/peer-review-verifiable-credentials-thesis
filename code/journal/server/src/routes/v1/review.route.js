const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const credentialValidation = require('../../validations/credential.validation');
const reviewValidation = require('../../validations/review.validation');
const credentialController = require('../../controllers/credential.controller');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('postReview'), validate(reviewValidation.createReview), reviewController.createReview)
  .get(auth('getReviews'), validate(reviewValidation.getReviews), reviewController.getReviews);

router
  .route('/:reviewId')
  .get(auth('getReviews'), validate(reviewValidation.getReview), reviewController.getReview)
  .patch(auth('manageUsers'), validate(reviewValidation.updateReview), reviewController.updateReview)
  .delete(auth('manageUsers'), validate(reviewValidation.deleteReview), reviewController.deleteReview);

router
  .route('/credential/:reviewId')
  .get(auth('getReviews'), validate(credentialValidation.getCredential), credentialController.getCredential);

module.exports = router;
