const express = require("express");
const router = express.Router();

const adminRoute = require("../controllers/adminController");

router.get("/admin", adminRoute.adminController);

// router.get('/admin', function(req, res, next) {
//     res.send('Admin portal');
// });

module.exports = router;
