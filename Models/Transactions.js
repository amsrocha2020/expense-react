const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Insira uma categoria']
    },
    type_category: {
        type: String,
        required: [true, 'Insira um tipo de categoria']
    },
    amount: {
        type: Number,
        required: [true, 'Insira um valor']
    },
    date: {
        type: Date,
        required: [true, 'Insira uma data']
    },
    state: {
        type: String,
        required: [true, 'Insira um estado']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transactions', TransactionsSchema);