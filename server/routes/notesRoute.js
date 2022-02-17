const express = require("express");
router = express.Router();

notesRoute = require("../controllers/notesController");

router.get("/", notesRoute.notesController);

module.exports = router;