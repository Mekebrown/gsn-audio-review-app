const db = require('../models');
const Note = db.notes;
const Op = db.Sequelize.Op;

// Find a single note with an id
exports.get = (req, res) => { 
};

// Update a note by the id in the request
exports.update = (req, res) => {
  
};

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
  
};

exports.userSingleProjectController = (req, res) => {
    res.json({
        userSingleProject: ["audio.mp3", "this", "works?"]
    });
}