// Setting up MySQL xconnection per the set-up instructions from Heroku's docs on hooking up with their JawsDB..
var mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bootcamp_db'
  });
}

// Making the connection. 
connection.connect(function(error) {
  if (error) {
    console.log('Error in your connection attempt!' + error.stack);
    return;
  }
  console.log('You are connected as ID: ' + connection.threadId);
});

// Exporting connection for the ORM to use. 
module.exports = connection;