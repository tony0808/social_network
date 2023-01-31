const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to db
const dbURI = 'mongodb+srv://tony:tonycsd123@cluster0.7c8vm29.mongodb.net/social_network?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
    .then(function(result) {
        console.log('Connected to db');

        // listen for incoming requests
        app.listen(3000);
    })
    .catch(function(err) {
        console.log(err);
    })

// register view engine
app.set('view engine', 'ejs');

// routes
app.get('/', function(req, res) {
    res.render('index', {title:'homepage'});
});

app.get('/about', function(req, res) {
    res.render('about', {title:'About'});
});

app.get('/sign-up', function(req, res) {
    res.render('signUp', {title:'Sign Up'});
});

app.get('/log-in', function(req, res) {
    res.render('logIn', {title:'Log In'})
})