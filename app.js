const express = require('express');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/accountRoutes');

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
app.use(express.json());

// routes
app.get('/', function(req, res) {
    res.render('index', {title:'homepage'});
});

app.get('/about', function(req, res) {
    res.render('about', {title:'About'});
});

// account routes
app.use('/account', accountRoutes);
