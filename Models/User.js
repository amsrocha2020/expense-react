const moongose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new moongose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = moongose.model('User', UserSchema);