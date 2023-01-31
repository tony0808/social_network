const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingUserSchema = Schema({
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

const pendingUser = mongoose.model('pendingUser', pendingUserSchema);
module.exports = pendingUser;