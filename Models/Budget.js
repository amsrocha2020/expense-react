const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    month: {
        type: Number,
        required: [true, 'Please add month']
    },
    year: {
        type: Number,
        required: [true, 'Please add year']
    },
    value: {
        type: Number,
        required: [true, 'Please add value']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Budget', BudgetSchema);