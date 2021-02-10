const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Post, validatePost } = require("../models/post");
const { Reply, validateReply } = require("../models/replies");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  let all_posts = await Post.find().sort("time");
  res.send(all_posts);
});

router.get("/:id", async (req, res) => {
  const post = await Post.find({ _id: req.params.id });
  if (!post) return res.send("Post with given ID doesn't exists!");
  const replies = await Reply.find({ post: req.params.id });
  res.send(post, replies);
});



router.post("/create", auth, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const post = new Post({
    title: req.body.title,
    //tags: req.body.tags,
    description: req.body.description,
    author: req.user._id,
    views: 1,
    upvotes: 0,
  });
  try {
    await post.save();
    res.send("Post succesfully created.");
  } catch (err) {
    console.log("error: ", err);
  }
});

module.exports = router;
