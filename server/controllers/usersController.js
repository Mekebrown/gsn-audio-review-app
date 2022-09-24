const mysql = require('mysql');
const config = require('../database/db_details');

const { details, queryDatabase } = config;

// db connection; Add a server limiter with createPool
const conn = new mysql.createConnection(details);

conn.connect((err) => {
  if (err) {
    console.error("Cannot connect. Error: " + err);
  } else {
    console.log("Connection established for users.");
  }
});

// Create and Save a new user
exports.create = (req, res) => {

};
// Retrieve all users from the database.
exports.findAll = (req, res) => {

};
// Find a single user with an id
exports.findOne = (req, res) => {

};
// Update a user by the id in the request
exports.update = (req, res) => {

};
// Delete a user with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all users from the database.
exports.deleteAll = (req, res) => {

};
// Find all published users
exports.findAllPublished = (req, res) => {

};
exports.usersController = (req, res) => {
  res.json({
    usersList: ["Lance", "Meke"]
  });
};