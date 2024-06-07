const User = require("../model/User");
const bycrypt = require("bcryptjs");
const sendToken = require("../utils/Token");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPasssword = await bycrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPasssword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      user: newUser,
      messgae: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "User not found",
      });
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid credentials",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyDetails = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

const getDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      user,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { registerUser, login, getMyDetails, getDetails };
