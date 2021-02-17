const mongoose = require('mongoose');
const Joi = require("joi");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  used: {
    type: Number,
    default: 0
  }
});


const Tag = mongoose.model("Tag", tagSchema);

function validateTag(tag) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(25),
  });
  return schema.validate(tag);
}

exports.tagSchema = tagSchema;
exports.validateTag = validateTag;
exports.Tag = Tag;
