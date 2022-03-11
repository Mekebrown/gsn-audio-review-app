const express = require("express");
const router = express.Router();

const allProjectsRoute = require("../controllers/allProjectsController");

router.get("/projects/", allProjectsRoute.allProjectsController);

// router.get('/projects', function(req, res, next) {
//     res.send('Projects portal');
// });

module.exports = router;
