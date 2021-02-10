const mongoose = require("mongoose");
const Joi = require("joi");

const replySchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: {
     type: String,
     required: true,
     minlength: 3,
     maxlength: 1024
  },
  author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
  },
  upvotes: Number,
  time: {
      type: Date,
      default: Date.now
  }
});

const Reply = mongoose.model("Reply", replySchema);


// function to validate posts
function validateReply(post) {
  return true;
};


exports.Reply = Reply;
exports.validateReply = validateReply;
