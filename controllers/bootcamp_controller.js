// Setting up dependacies. 
var express = require('express');

var router = express.Router();

// Importing the modal(bgootcamp.js) to use it's database function.
var subject = require('../models/subject.js');

// Creating the routes needed for this app and the logic for each route.
router.get('/', function(request, response) {
  subject.all(function(data) {
    var hbsObject = {
      subject: data
    };
    console.log(hbsObject);
    response.render('index', hbsObject);
  });
});

router.post('/api/subject', function(request, response) {
  subject.create([
    'technology_name'
  ], [
    request.body.technology_name
  ], function(result) {
    console.log(request.body.technology_name)
      // Sending back the ID of the new subject. 
    response.json({ id: result.insertId });
  });
});

router.put('/api/subject/:id', function(request, response) {
  var condition = 'id = ' + request.params.id;
  console.log('Condition: ', condition);
  // If no rows were changed, then the ID does not exist. Show a 404. 
  subject.update(request.body, condition, function(result) {
    if (result.changedRows == 0) {
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  });
});

router.delete('api/subject/:id', function(request, response) {
  var condition = 'id = ' + request.params.id;
  console.log(condition)
  subject.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID does not exist. Show a 404. 
      return response.status(404).end();
    } else {
      response.status(200).end();
    }
  });
});

// Exporting routes for the server.js file to use. 
module.exports = router;