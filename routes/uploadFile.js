const express = require('express');
const router = express.Router();
const { uploadFile } = require('../Controllers/uploadFile');

router
    .route('/')
    .post(uploadFile);

module.exports = router;