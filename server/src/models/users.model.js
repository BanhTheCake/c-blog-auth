const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username must be required !']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password must be required !']
    },
    gmail: {
        type: String,
        trim: true,
        required: [true, 'Gmail must be required !']
    },
    token: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true,
    collection: 'users'
});

const Users = mongoose.model('users', userSchema);
module.exports = Users


