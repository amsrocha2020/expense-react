const express = require('express');
const router = express.Router();
const { getTransactions, getTransactionsById, addTransaction, deleteTransactions  } = require('../controllers/transactions');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .get(getTransactionsById)
    .delete(deleteTransactions);

module.exports = router;