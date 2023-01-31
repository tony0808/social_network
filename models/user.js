const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new Schema({
    firstname: {
        type:String,
        required:[true, 'Please enter a first name']
    },
    lastname: {
        type:String
    },
    username: {
        type:String,
        required:[true, 'Please enter a username']
    },
    password: {
        type:String,
        required:[true, 'Please enter a password']
    },
    email: {
        type:String,
        required:[true, 'Please enter an email'],
        validate: [isEmail, 'Please enter a valid email']
    },
    country: {
        type:String
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;