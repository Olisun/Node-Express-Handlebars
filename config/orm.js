// Importing MySQL connection. 
var connection = require('./connection.js');

// Helper function for SQL sytax. 
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push('?');
  };
  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax. 
function objToSql(obj) {
  var arr = [];
  // Looping through the keys and push the key/value as a string into var arr. 
  for (var key in obj) {
    var value = ob[key];
    // check to skip hidden properties. 
    if (Object.hasOwnProperty.call(ob, key)) {
      // if a string has spaces, then add quotes to make it a string. 
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'";
      };
      arr.push(key + '=' + value);
    };
  };
  //  Translating the array of strings into a single comma separated string. 
  return arr.toString();
};

// Object for all our SQL statement functions. 
var orm = {
  // For query entire db. 
  all: function(tableInput, cb) {
    var queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(error, result) {

      if (error) {
        throw error;
      }
      cb(result);
    });
  },

  allSubject: function(table, subjectCol, cb) {
    var queryString = 'SELECT * FROM ' + 'ORDER BY ' + subjectCol;
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      cb(result);
    });
  },

  // For adding an object. 
  create: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (';
    queryString += cols.toString();
    queryString += ') ';
    queryString += 'VALUES (';
    queryString += printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(error, result) {
      if (error) {
        throw error;
      }
      cb(result);
    })
  },

  // For updating an object. 
  update: function(table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;

    queryString += ' SET ';
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      cb(result);
    });
  },

  // For deleting an object. 
  delete: function(table, condition, cb) {
    var queryString = 'DELETE FROM ' + table;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      cb(result);
    });
  }
};

// Exporting the orm object so the bootcamp.js model can use it.
module.exports = orm;