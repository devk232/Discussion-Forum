const mongoose = require("mongoose");
const Joi = require("joi");

const Discussion = mongoose.model(
  "Discussion",
  new mongoose.Schema({
    topic: {
      type: String,
      minlength: 10,
      maxlength: 255,
      required: true
    },
    desciption: {
      type: String,
      minlength: 1,
      maxlength: 2000,
      required: true
    },
    tags: {
      type: String,
    },
  })
);

function validateDiscussion(discussion) {
  const schema = {};
  return Joi.validateDiscussion(discussion, schema);
}

exports.validateDiscussion = validateDiscussion;
exports.Discussion = Discussion;
