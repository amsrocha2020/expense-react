const express = require('express');
const router = express.Router();
const { getBudget, addBudget, deleteBudget } = require('../Controllers/budget');

router
    .route('/')
    .get(getBudget)
    .post(addBudget);

router
    .route('/:id')
    .delete(deleteBudget);

module.exports = router;