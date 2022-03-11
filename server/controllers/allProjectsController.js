const db = require('../models');
const Note = db.notes;
const Op = db.Sequelize.Op;

// Create and Save a new note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Note can not be empty!"
    });

    return;
  }

  // Create a Note
  const note = {
    note_id: 1,
    user_id: 1,
    project_name: req.body.project_name,
    contents: req.body.contents,
    creation_datetime: new Date
  };

  // Save Note
  Note.create(note)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the note."
      });
    });
};

// Retrieve all notes from the database.
exports.findAll = (req, res) => {
    const user_id = req.query.user_id;

    var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` }} : null;

    Note.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
// Find a single note with an id
exports.findOne = (req, res) => {
  
};
// Update a note by the id in the request
exports.update = (req, res) => {
  
};
// Delete a note with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all notes from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published notes
exports.findAllPublished = (req, res) => {
  
};

exports.allProjectsController = (req, res) => {
    res.json({
        allProjects: ["projects 1", "projects 2", "this", "works?"]
    });
}