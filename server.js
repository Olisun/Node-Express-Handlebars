// Setting up dependacies for the server. 
var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var app = express();

// Serving the static contect for the app from the "public" directory in the app directory.
app.use(express.static('public'));

// Setting up body-parser as middle-ware which interprets the data sent to the server.
app.use(express.urlencoded({ extended: false }));

// Setting Handlebars. 
var expressHb = require('express-handlebars');

app.engine('handlebars', expressHb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Importing the routes and giving the server access to them. 
var bootcampRoutes = require('./controllers/bootcamp_controller.js');

app.use('/', bootcampRoutes);

// Logging in on the server-side when the server has started. 
app.listen(port, function() {
  console.log('Server listening on: http://localhost: ' + PORT);
});