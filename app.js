const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for incoming requests
app.listen(3000);

// routes
app.get('/', function(req, res) {
    res.render('index');
});