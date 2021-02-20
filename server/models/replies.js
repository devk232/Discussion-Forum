const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 5000,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Reply = mongoose.model("Reply", replySchema);


// function to validate posts
function validateReply(reply) {
  const schema = Joi.object({
    comment: Joi.string().required().min(3).max(5000),
  });
  return schema.validate(reply);
};


exports.Reply = Reply;
exports.validateReply = validateReply;
