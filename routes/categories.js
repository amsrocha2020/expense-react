const express = require('express');
const router = express.Router();
const { getCategory, addCategory, deleteCategory } = require('../Controllers/categories');

router
    .route('/')
    .get(getCategory)
    .post(addCategory);

router
    .route('/:id')
    .delete(deleteCategory);

module.exports = router;