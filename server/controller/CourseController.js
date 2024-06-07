const Course = require("../model/Course");

const createCourse = async (req, res) => {
  const { title, description, instructors, image, tuition, duration } =
    req.body;
  try {
    const course = new Course({
      title,
      description,
      image,
      instructors,
      tuition,
      duration,
      instructor: req.user._id,
    });
    await course.save();
    res.status(201).json({
      success: true,
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      res.json({
        success: false,
        message: "No course found",
      });
    }
    res.json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.json({
        success: false,
        message: "No course found",
      });
    }
    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!course) {
      res.json({
        success: false,
        message: "No course found",
      });
    }
    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.json({
        success: false,
        message: "No course found",
      });
    }
    course.students.push(req.user._id);
    await course.save();
    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || error,
    });
  }
};
module.exports = {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
  enrollCourse,
};
