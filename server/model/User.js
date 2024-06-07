const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Your password must be longer than 6 characters"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },

  points: {
    type: Number,
    default: 0,
  },
  badges: [
    {
      type: String,
    },
  ],

  avatar: {
    public_id: {
      type: String,
      default: Math.floor(100000 + Math.random() * 900000).toString(),
    },
    url: {
      type: String,
      default:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("User", userSchema);
