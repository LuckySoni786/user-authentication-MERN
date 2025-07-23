const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User is already exist", success: false });
    }

    const userModel = new UserModel({ username, email, password });

    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();

    res.status(201).json({
      message: "SignUp successfully",

      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",

      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    console.log("this is user:",user.username);
    
    const errorMsg = "Auth failed email or password is worng";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "login successfully",
      success: true,
      jwtToken,
      email
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",

      success: false,
    });
  }
};

module.exports = { signup, login };
