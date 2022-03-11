const express = require("express");
const router = express.Router();

const indexRoute = require("../controllers/indexController");

router.get("/", indexRoute.indexController);

module.exports = router;