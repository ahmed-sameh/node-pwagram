const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const posts = await Post.find();
    posts.map((post) => (post.image = `${baseUrl}/${post.image}`));
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
  const image = req.file
    ? req.file.path
    : "images/2024-01-15T09:38:37.612Z-icon-3.png";
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
