const userModel = require("../models/user");
const SECRET_KEY = "NOTEKEY";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const exitingUser = await userModel.findOne({ email: email });
    if (exitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = userModel.create({
      userName: userName,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exitingUser = await userModel.findOne({ email: email });
    if (!exitingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, exitingUser.password);
    if (!matchPassword) {
      res.status(400).json("indvalid credentails");
    }
    const token = jwt.sign(
      { email: exitingUser.email, id: exitingUser._id },
      SECRET_KEY
    );
    res.status(201).json({ user: exitingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signin,
  signup,
};
