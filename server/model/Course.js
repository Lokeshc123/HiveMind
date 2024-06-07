const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
  },
  description: {
    type: String,
    required: [true, "Please enter course description"],
  },
  image: {
    type: String,
    required: [true, "Please enter course image"],
  },
  instructors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  modules: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Module",
    },
  ],
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  tuition: {
    type: Number,
    required: [true, "Please enter course tuition"],
  },
  points: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: [true, "Please enter course duration"],
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

module.exports = mongoose.model("Course", courseSchema);
