const mysql = require('mysql');
const config = require('../database/db_details');

const {details, queryDatabase} = config;

// db connection; Add a server limiter with createPool
const conn = new mysql.createConnection(details);

conn.connect((err) => {
  if (err) {
    console.log("Cannot connect. Error: " + err);
  } else {
    console.log("Connection established for index.");
  }
});

exports.indexController = (req, res) => {
  res.json({
    indexList: ["index 1", "index 2", "this", "works?"]
});
}