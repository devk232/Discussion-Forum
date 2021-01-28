const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80,
  },
  tags: {
    type: Array,
    validate: {
      validator: function (a) {
        return a && a.length > 0;
      },
    },
  },
  description: {
     type: String,
     required: true,
     minlength: 5,
     maxlength: 1024
  },
  author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
  },
  views: Number,
  upvotes: Number,
  time: {
      type: Date,
      default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
    const schema = Joi.object({
        title = Joi.string().min(10).max(80).required(),
        description = Joi.string().min(5).max(1024).required()
    });
    return schema.validate(post);
};

exports.Post = Post;
exports.validatePost = validatePost;