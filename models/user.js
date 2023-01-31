const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type:String
    },
    lastname: {
        type:String
    },
    username: {
        type:String
    },
    password: {
        type:String
    },
    email: {
        type:String
    },
    country: {
        type:String
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;