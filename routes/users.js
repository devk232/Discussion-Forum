const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("config");
const { User, validate, validateUser } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id , isAdmin: user.isAdmin}, config.get("jwtPrivateKey"));
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    console.log("error: ", err);
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { error } = valid(req.body);
  if (error) return res.sthashatus(400).send(error.details[0].message);
   
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send(400).send("Invalid email or password");

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(400).send("invalid email or password");
  
  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.header('x-auth-token')
});


router.post("/logout", async (req, res) => {

});
module.exports = router;
