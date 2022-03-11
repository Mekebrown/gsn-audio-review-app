const express = require("express");
const router = express.Router();

const usersRoute = require("../controllers/usersController");

router.get("/users/", usersRoute.usersController);

module.exports = router;