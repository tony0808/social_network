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
    blogs: [{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    }],
    profile: {
        type:Schema.Types.ObjectId,
        ref:'Profile'
    }
}, {timestamps: true});


// hash the password before the user is saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to log in user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
}

const User = mongoose.model('user', userSchema);
module.exports = User;