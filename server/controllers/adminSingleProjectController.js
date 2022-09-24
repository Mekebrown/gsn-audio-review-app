const mysql = require('mysql');
const config = require('../database/db_details');

const { details, queryDatabase } = config;

// db connection; Add a server limiter with createPool
const conn = new mysql.createConnection(details);

conn.connect((err) => {
  if (err) {
    console.error("Cannot connect. Error: " + err);
  } else {
    console.log("Connection established for admin.");
  }
});

exports.adminSingleProjectController = (req, res) => {
  res.json({
    adminSingleProject: ["admin single project 1", "admin single project 2", "this", "works?"]
  });
};