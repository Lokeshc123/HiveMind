const express = require("express");
const {
  registerUser,
  login,
  getMyDetails,
  getDetails,
} = require("../controller/UserController");
const { isVerfied, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/me").get(isVerfied, getMyDetails);
router.route("/:userId").get(isVerfied, authorizeRoles("admin"), getDetails);

module.exports = router;
