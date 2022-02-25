var mysql = require('mysql');
var config = require('../database/db_details');

var {details, queryDatabase} = config;

// db connection; Add a server limiter with createPool
const conn = new mysql.createConnection(details);

conn.connect((err) => {
  if (err) {
    console.log("Cannot connect. Error: " + err);
  } else {
    console.log("Connection established.");
  }
});

exports.indexController = (req, res) => {
    var content = [];

    conn.query('SELECT * FROM media', (err, results, fields) => {
        if (err) {
            throw err;
        }

        for (let x in results[0]) {
            content.push(results[0][x]);
        }

        res.json({indexContent: content});
    });
}