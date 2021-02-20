const mongoose = require("mongoose");
const { User } = require("./user");
const Joi = require("joi");
const { tagSchema } = require("./tag");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80,
  },
  tags: {
    type: [tagSchema],
    validate: {
      validator: function (a) {
        return a && a.length >= 0;
      },
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: {
    type: Number,
    default: 1,
    min: 1,
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

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = Joi.object({
    title: Joi.string().required().min(10).max(80),
    description: Joi.string().required().min(3).max(1024),
    tags: Joi.array(),
  });
  return schema.validate(post);
}

exports.Post = Post;
exports.validatePost = validatePost;

// async function listPosts() {
//   const users = await Post.find().select().populate('author');
//   console.log(users);
// }

//listPosts();

// async function CreatePost() {
//   const a = new Post({
//     title: 'Should I learn Web Dev?',
//     description: 'The title explains it all',
//     author: '6012bd5feff00735ffd93f83'
//   });
//   await a.save();
// }

//CreatePost();

//listPosts();
