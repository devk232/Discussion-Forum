const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config")

const User = mongoose.model("User", new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 10,
      maxlength: 1024,
    },
  })
);

// for registering validattion
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validateUser(user, schema);
}

// for login validation
function validate(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };
  return Joi.validateUser(user, schema);
}

exports.valid = validate;
exports.User = User;
exports.validate = validateUser;
