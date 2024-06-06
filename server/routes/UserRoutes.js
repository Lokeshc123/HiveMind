const express = require("express");
const { registerUser } = require("../controller/UserController");

const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;
