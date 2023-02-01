const User = require('../models/user');

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
            res.status(200).send('user account created');
        })
        .catch(function(err) {
            const errorInfo = account_creation_error_handler(err);
            res.status(400).json({errorInfo});
        })
};

const account_login_post = function(req, res) {
    console.log(req);
};


module.exports = {
    account_login_get,
    account_create_get,
    account_create_post,
    account_login_post
}