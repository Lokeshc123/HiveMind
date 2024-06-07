const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter module title"],
  },
  lessons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Lesson",
    },
  ],
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Modules", moduleSchema);
