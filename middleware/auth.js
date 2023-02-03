const jwt = require('jsonwebtoken');

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

module.exports = {requireAuth};