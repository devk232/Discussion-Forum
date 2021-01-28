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

const Reply = mongoose.model("Post", replySchema);

function validateReply(post) {
    const schema = Joi.object({
        comment = Joi.string().min(3).max(1024).required()
    });
    return schema.validate(post);
};


exports.Reply = Reply;
exports.validateReply = validateReply;
