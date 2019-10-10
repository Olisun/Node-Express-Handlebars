// Importing the ORM to create functions that will interact with the db. 
var orm = require('../config/orm.js');

var subject = {
  all: function(cb) {
    orm.all('subjects', function(response) {
      cb(response);
    })
  },

  // The variable columns and values are arrays. 
  create: function(cols, vals, cb) {
    orm.create('subjects', cols, vals, function(response) {
      cb(response);
    });
  },

  update: function(objColVals, condition, cb) {
    orm.update('subjects', objColVals, condition, function(response) {
      cd(response);
    });
  },

  delete: function(condition, cb) {
    orm.delete('subjects', condition, function(response) {
      cb(response);
    });
  }
};

module.exports = subject;