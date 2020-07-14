const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    month: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Budget', BudgetSchema);