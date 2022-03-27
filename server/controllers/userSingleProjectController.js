const db = require('../models');
const Note = db.notes;
const Op = db.Sequelize.Op;

const getQueryValues = (queryStatement, params = []) => {
    return new Promise((resolve, reject) => {
        conn.query(queryStatement, params, (err, rows) => {                                                
            if (err || rows === undefined) {
                reject(new Error("Error with the row retrieval"));
            } else {
                resolve(rows);
            }
        });
    });
};

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