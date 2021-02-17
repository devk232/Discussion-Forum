const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Post, validatePost } = require("../models/post");
const { Reply, validateReply } = require("../models/replies");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const { Tag } = require("../models/tag");

router.get("/", async (req, res) => {
  let all_posts = await Post.find().populate('author', 'name -_id');
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
  const tags = req.body.tags;
  const tags_array = [];
  for (let i = 0; i < tags.length; i++) {
    const tag_in_db = await Tag.findById(tags[i]);
    if (!tag_in_db) return res.status(400).send("Invalid Tag");
    tags_array.push(tag_in_db);
  }
  const post = new Post({
    title: req.body.title,
    tags: tags_array,
    description: req.body.description,
    author: req.user._id,
    views: 1,
  });
  try {
    await post.save();
    res.send("Post succesfully created.");
  } catch (err) {
    console.log("error: ", err);
  }
});



module.exports = router;
