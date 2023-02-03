const express = require('express');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/accountRoutes');
const blogRoutes = require('./routes/blogRoutes');
const {requireAuth} = require('./middleware/auth');
const cookieParser = require('cookie-parser');

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

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());

// routes
app.get('/', function(req, res) {
    res.render('index', {title:'homepage'});
});

app.get('/about', function(req, res) {
    res.render('about', {title:'About'});
});

app.get('/terms', function(req, res) {
    res.render('termsAndConditions', {title:'Terms And Conditions'});
});

// account routes
app.use('/account', accountRoutes);

// blog routes
app.use('/blog', requireAuth, blogRoutes);