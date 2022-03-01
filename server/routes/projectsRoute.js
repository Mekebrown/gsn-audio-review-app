const express = require("express");
router = express.Router();

projectsRoute = require("../controllers/projectsController");

router.get('/projects', function(req, res, next) {
    res.send('Projects portal');
});

module.exports = router;
