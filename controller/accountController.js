const User = require('../models/user');

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
            console.log(err);
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