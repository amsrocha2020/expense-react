const express = require('express');
const router = express.Router();
const { getTypeCategories, addTypeCategories, deleteTypeCategory } = require('../Controllers/typeCategories');

router
    .route('/')
    .get(getTypeCategories)
    .post(addTypeCategories);

router
    .route('/:id')
    .delete(deleteTypeCategory);

module.exports = router;