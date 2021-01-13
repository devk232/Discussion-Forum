const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("config");
const { valid, User, validateUser } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router = express.router();

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  const user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = valid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(400).send("invalid email or password");
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.send(token);
});

router.post("/logout", async (req, res) => {});
module.exports = router;
