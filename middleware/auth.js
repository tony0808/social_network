const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check if token exists and if its verified
    if (token) {
        jwt.verify(token, 'tony csd', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/account/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }   
    else {
        res.redirect('/account/login');
    }
};

// get id of user if he is logged in
const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'tony csd', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.locals.user = null;
        next();
    }
};


module.exports = {requireAuth, userAuth};