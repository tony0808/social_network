const pendingUser = require('../models/pendingUser')

const account_login_get = function(req, res) {
    res.render('logIn', {title:'Log In'});
};

const account_create_get = function(req, res) {
    res.render('signUp', {title:'Sign Up'});
};

const account_create_post = function(req, res) {
    const newPendingUser = new pendingUser(req.body);
    newPendingUser.save()
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