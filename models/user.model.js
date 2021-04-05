const moment = require('moment');
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    createdAt: {
        type: String,
        default: moment().unix()
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, role, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);