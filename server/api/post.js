const Post = require("../models/Post");

const getPosts = async (req, res) => {
  try {
    const { titleName } = req.query;
    const { userId } = req;
    let queryObj = {
      user: userId,
    };
    if (titleName) {
      queryObj = {
        ...queryObj,
        title: new RegExp(titleName),
      };
    }
    const posts = await Post.find(queryObj).populate("user", ["username"]);
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

const createPost = async (req, res) => {
  const { title, description, url, status } = req.body;
  const { userId } = req;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required!!",
    });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO_LEARN",
      user: userId,
    });

    await newPost.save();

    res.status(200).json({
      success: true,
      message: "Create post success",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

const updatePost = async (req, res) => {
  const { title, description, url, status } = req.body;
  const { userId } = req;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required!!",
    });
  }

  try {
    let updatePost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `https://${url}` || "",
      status: status || "TO_LEARN",
    };

    const postUpdateCondition = { _id: req.params.postId, user: userId };

    updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    // check authorised user not to update
    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update post success",
      post: updatePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.postId, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    // check if not authorized or post not found
    if (!deletePost) {
      return res.status(401).json({
        success: false,
        message: "User not authorized or post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delete post success",
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "INTERNAL",
    });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
