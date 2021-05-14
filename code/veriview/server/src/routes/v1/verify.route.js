const express = require('express');

const router = express.Router();

const verifyController = require('../../controllers/verify.controller');

// Since proof verification fails on Browser WASM but works on node, we move verification to server side temporarily.
router.route('/').post(verifyController.verifyProof);

module.exports = router;
