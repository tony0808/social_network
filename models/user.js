const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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


// hash the password before the user is saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;