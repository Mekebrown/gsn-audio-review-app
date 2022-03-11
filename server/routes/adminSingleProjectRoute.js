const express = require("express");
const router = express.Router();

const adminSingleProjectRoute = require("../controllers/adminSingleProjectController");

router.get("/asingle", adminSingleProjectRoute.adminSingleProjectController);

module.exports = router;