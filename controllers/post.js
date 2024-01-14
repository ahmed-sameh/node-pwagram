const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      posts: posts,
      messages: "Posted Fetched Succefully !",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  const title = req.body.title;
  const location = req.body.location;
  const image = req.file.path;

  const post = new Post({
    title,
    location,
    image,
  });

  try {
    await post.save();

    res.status(201).json({
      message: "Post created successfully !",
      post,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
