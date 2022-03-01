// const express = require("express");
// router = express.Router();

// notesRoute = require("../controllers/notesController");

// router.get("/", notesRoute.notesController);

module.exports = app => {
    const notes = require("../controllers/notesController.js");

    var router = require("express").Router();

    // Create a new Note
    router.post("/notes", notes.create);

    // Retrieve all Notes
    router.get("/notes", notes.findAll);

    // Retrieve all published Notes
    router.get("/notes/published", notes.findAllPublished);

    // Retrieve a single Note with id
    router.get("/notes:id", notes.findOne);

    // Update a Note with id
    router.put("/notes:id", notes.update);

    // Delete a Note with id
    router.delete("/notes:id", notes.delete);

    // Delete all Notes
    router.delete("/notes", notes.deleteAll);

    app.use('/notes', app);
};
