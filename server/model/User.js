const mongoose = require("mongoose");

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
  },
  avatar: {
    public_id: {
      type: String,
      required: false,
      default: Math.floor(100000 + Math.random() * 900000).toString(),
    },
    url: {
      type: String,
      required: false,
      default:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
