const Transaction = require('../Models/Transactions');

// @desc Get all transactions
// @route /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
    // res.send('GET transactions');
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Get one transaction
// @route POST /api/v1/transactions
// @access Public
exports.getTransactionsById = async (req, res, next) => {
    try {
        const transactions = await Transaction.findById(req.params.id);

        if(!Transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

exports.updateTransaction = async (req, res, next) => {
    try {
        const transactions = await Transaction.findByIdAndUpdate(req.params.id, {
            category_id: req.body.category_id,
            type_category: req.body.type_category,
            date: req.body.date,
            state: req.body.state,
            amount: req.body.amount
        });

        if(!Transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc Add all transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (err) {
        //console.log(err);
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }

}

// @desc Delete all transactions
// @route GET /api/v1/transactions/:id
// @access Public
exports.deleteTransactions = async (req, res, next) => {
    // res.send('DELETE transactions');
    try {
        const transaction = await Transaction.findById(req.params.id);

        if(!Transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        await transaction.remove();

        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}