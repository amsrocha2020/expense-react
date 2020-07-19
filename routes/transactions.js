const express = require('express');
const router = express.Router();
const { getTransactions, getTransactionsById, addTransaction, deleteTransactions, updateTransaction  } = require('../controllers/transactions');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .get(getTransactionsById)
    .delete(deleteTransactions)
    .put(updateTransaction);

module.exports = router;