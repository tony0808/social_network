# Social Network Site
This is a project for a social network site. People can create an account. Once an account is created, users can search for other people on the site, send them requests and once accepted chat with them. 

# Implementation
For the implementation of the server I use node.js and express.

# MVC
The project follows the MVC model. The Model is about the data in the database and the View is about the page presented to the user. The Controller stands between the Model and the View. In the Controller we implement the functions that are responsible for the communication between the users (View) and the database (Model).

# Controller folder
Here we define the functions that will be called once the corresponding URL is visited. All the functions are collected in an object and exported.

# routes folder
Here we define the routes for our page using the 'router' object from the express library. We also import the functions that will be called once the URL is visited from the Controller folder. For every route created we match it with a reference to the corresponding function in the Controller folder.

