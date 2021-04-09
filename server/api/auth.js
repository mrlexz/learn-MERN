const argon2d = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const checkLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!!!" });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password!!!",
    });
  }

  try {
    // check for existing user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
    // username found
    const passwordValid = await argon2d.verify(user.password, password);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "Login success",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user and/or password!!" });
  }
  // check if existing user
  try {
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already existed!!!" });
    }

    const hashedPassword = await argon2d.hash(password);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    // return token

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created!!!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

module.exports = {
  checkLogin,
  login,
  register,
};
