const User = require("../model/User");
const bycrypt = require("bcryptjs");

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
      messgae: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { registerUser };
