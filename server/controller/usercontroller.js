const express = require("express");
const router = express.Router();

const User = require("../model/User");

const bcrypt = require("bcryptjs");
const { mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
//function to create Token
const createToken = (userId) => {
  return jwt.sign({ userId }, "mysecretkey", { expiresIn: "1hour" });
};

//create user
router.post("/register", async (req, res) => {
  try {
    console.log("Signup api called");
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    //res.status(200).json(newStudent);
    return res.status(200).json({ message: "User data stored" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//login authentication
router.post("/login", async (req, res) => {
  try {
    console.log("login api called");
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedPassword = user.password;
    console.log("stored Password: " + storedPassword);

    const passwordMatch = await bcrypt.compare(password, storedPassword);
    console.log("passwordmatch", passwordMatch);
    if (passwordMatch) {
      const token = createToken(user._id);
      console.log("Token :", token);
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

      return res.status(201).json({
        message: "login success with jwt",
        user: user._id,
        token: token,
      });
      //return res.status(200).json({ message: "Login successful", user: user });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error user login" });
  }
});

module.exports = router;
