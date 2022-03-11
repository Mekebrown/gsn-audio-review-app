const express = require("express");
const router = express.Router();

const userSingleProjectRoute = require("../controllers/userSingleProjectController");

router.get("/usingle/", userSingleProjectRoute.userSingleProjectController);

// router.get('/usingle/', function(req, res, next) {
//     res.send('Single project portal');
// });

module.exports = router;
