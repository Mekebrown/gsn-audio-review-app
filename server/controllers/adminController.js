const mysql = require('mysql');
const config = require('../database/db_details');

const {details, queryDatabase} = config;

// db connection; Add a server limiter with createPool
const conn = new mysql.createConnection(details);

conn.connect((err) => {
  if (err) {
    console.log("Cannot connect. Error: " + err);
  } else {
    console.log("Connection established for admin.");
  }
});

exports.adminController = (req, res) => {
  res.json({
    adminList: ["admin 1", "admin 2", "this", "works?"]
});
}