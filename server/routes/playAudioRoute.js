const express = require("express");
router = express.Router();

playAudioRoute = require("../controllers/playAudioController");

router.get("/playaudio", playAudioRoute.playAudioController);

module.exports = router;