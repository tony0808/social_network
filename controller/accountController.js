const User = require('../models/user');

function handle_errors(err) {
    let errors = {
        firstname : '',
        username: '',
        email : '',
        password: ''
    };

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message;
        });
    }
    return errors;
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
            res.redirect('/');
        })
        .catch(function(err) {
            const errors = handle_errors(err);
            res.status(400);
            res.json(errors);
        });
};

const account_login_post = function(req, res) {
    console.log(req.body);
};


module.exports = {
    account_login_get,
    account_create_get,
    account_create_post,
    account_login_post
}