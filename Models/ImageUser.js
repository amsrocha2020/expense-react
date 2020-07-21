const mongoose = require('mongoose');

const ImageUserSchema = new mongoose.Schema({
    image: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ImageUser', ImageUserSchema);