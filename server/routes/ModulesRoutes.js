const express = require("express");
const { isVerfied, authorizeRoles } = require("../middlewares/auth");
const {
  createModule,
  getModuleDetails,
} = require("../controller/ModuleController");

const router = express.Router();

router
  .route("/new")
  .post(isVerfied, authorizeRoles("instructor", "admin"), createModule);
router.route("/:moduleId").get(getModuleDetails);

module.exports = router;
