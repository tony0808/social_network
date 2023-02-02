const User = require('../models/user');
const jwt = require('jsonwebtoken');

// token max age
const maxAge = 3 * 24 * 60 * 60;

function account_creation_error_handler(err) {
    let errorInfo = {
        firstname:'',
        username:'',
        password:'',
        email:''
    };

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(error => {
            errorInfo[error.properties.path] = error.properties.message;
        });
    }
    return errorInfo;
}

function createToken(id) {
    let token = jwt.sign({id}, 'tony csd', {expiresIn:maxAge});
    return token;
}


const account_login_get = function(req, res) {
    res.render('account/logIn', {title:'Log In'});
};

const account_create_get = function(req, res) {
    res.render('account/signUp', {title:'Sign Up'});
};

const account_create_post = function(req, res) {
    const newUser = new User(req.body);
    newUser.save()
        .then(function(result) {
            res.status(200).send({user:newUser._id});
        })
        .catch(function(err) {
            const errorInfo = account_creation_error_handler(err);
            res.status(400).json({errorInfo});
        })
};

const account_login_post = async function(req, res) {
    const {username, password} = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge:maxAge * 1000});
        res.status(200).json({user:user._id});
    }   
    catch(err) {
        res.status(400).send(err.message);
    }
};


module.exports = {
    account_login_get,
    account_create_get,
    account_create_post,
    account_login_post
}