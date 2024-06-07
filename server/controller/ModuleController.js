const Modules = require("../model/Modules");
const Course = require("../model/Course");

const createModule = async (req, res) => {
  try {
    const { title, course } = req.body;
    const courseExist = await Course.findById(course);
    if (!courseExist) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    const module = new Modules({
      title,
      course,
    });
    await module.save();
    courseExist.modules.push(module._id);
    await courseExist.save();
    res.status(201).json({
      success: true,
      message: "Module created successfully",
      data: module,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getModuleDetails = async (req, res) => {
  try {
    const module = await Modules.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found",
      });
    }
    res.status(200).json({
      success: true,
      data: module,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createModule, getModuleDetails };
