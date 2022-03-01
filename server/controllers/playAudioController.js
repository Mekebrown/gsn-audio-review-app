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

exports.playAudioController = (req, res) => {
  res.json({
    audioList: ["audio 1", "audio 2", "this", "works?"]
});
}