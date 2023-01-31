const express = require('express');
const router = express.Router();
const pendingUser = require('../models/pendingUser')

router.get('/account/create', function(req, res) {
    res.render('signUp', {title:'Sign Up'});
});

router.get('/account/login', function(req, res) {
    res.render('logIn', {title:'Log In'});
});

router.post('/account/create', function(req, res) {
    console.log(req.body);
    const newPendingUser = new pendingUser(req.body);
    
    newPendingUser.save()
        .then(function(result) {
            res.redirect('/');
        })
        .catch(function(err) {
            console.log(err);
        });
})

router.post('/account/login', function(req, res) {
    console.log(req.body);
});

module.exports = router;