const express = require("express");
router = express.Router();

indexRoute = require("../controllers/indexController");

router.get("/", indexRoute.indexController);

module.exports = router;