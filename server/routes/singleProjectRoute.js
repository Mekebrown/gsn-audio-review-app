const express = require("express");
router = express.Router();

singleProjectRoute = require("../controllers/singleProjectController");

router.get('/singleproject', function(req, res, next) {
    res.send('Single project portal');
});

module.exports = router;
