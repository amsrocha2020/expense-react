const mongoose = require('mongoose');

const TypeCategorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        trim: true,
        required: [true, 'Please add some category']
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TypeCategory', TypeCategorySchema);