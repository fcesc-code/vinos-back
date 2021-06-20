const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

const users = {
  mockUser: 'mockPassword123'
};

userRouter.post("/login", (req, res) => {
  const user = req.body;

  if (!users[user.username] || users[user.username] !== user.password) {
    return res.status(400).json({ msg: "Invalid username or password" });
  }
  res.json({
    msg: "Successfully logged in",
    token: jwt.sign({ user: user.username }, "SECRET")
  });
});

userRouter.post("/register", (req, res) => {
  const user = req.body;
  if (users[user.username]) {
    return res.status(400).json({ msg: "User already exists, please login." });
  }
  users[user.username] = user.password;
  res.json({
    msg: "Successfully created user, please login"
  });
});

module.exports = userRouter;
