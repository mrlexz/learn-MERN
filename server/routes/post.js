const express = require("express");
const router = express.Router();
// middlewares
const verifyToken = require("../middlewares/auth");
// api
const { getPosts, createPost, updatePost, deletePost } = require("../api/post");

// @route GET api/posts
// @dest Get post
// @access private
router.get("/", verifyToken, getPosts);

// @route POST api/posts
// @dest Create post
// @access private
router.post("/", verifyToken, createPost);

// @route PUT api/posts/id
// @dest Create post
// @access private
router.put("/:postId", verifyToken, updatePost);

// @route DELETE api/posts/:id
// @dest Create post
// @access private
router.delete("/:postId", verifyToken, deletePost);

module.exports = router;
