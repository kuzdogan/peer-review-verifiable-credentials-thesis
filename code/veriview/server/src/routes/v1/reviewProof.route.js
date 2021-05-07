const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewProofValidation = require('../../validations/reviewProof.validation');
const reviewProofController = require('../../controllers/reviewProof.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('postReviewProofs'), validate(reviewProofValidation.createReviewProof), reviewProofController.createReviewProof)
  .get(auth('getReviewProofs'), validate(reviewProofValidation.getReviewProofs), reviewProofController.getReviewProofs);

router
  .route('/:reviewProofId')
  .get(auth('getReviewProofs'), validate(reviewProofValidation.ReviewProof), reviewProofController.getReviewProof)
  // .patch(auth('manageUsers'), validate(reviewProofValidation.updateReview), reviewController.updateReview)
  .delete(
    auth('manageReviewProofs'),
    validate(reviewProofValidation.deleteReviewProof),
    reviewProofController.deleteReviewProof
  );

module.exports = router;
