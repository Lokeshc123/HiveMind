const express = require("express");
const { isVerfied, authorizeRoles } = require("../middlewares/auth");
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
  enrollCourse,
} = require("../controller/CourseController");

const router = express.Router();

router
  .route("/")
  .post(isVerfied, authorizeRoles("instrutor", "admin"), createCourse)
  .get(getAllCourses);

router.route("/:courseId").get(getCourseDetails).put(updateCourse);
router
  .route("/:courseId/enroll")
  .put(isVerfied, authorizeRoles("student"), enrollCourse);

module.exports = router;
