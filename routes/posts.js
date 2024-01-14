const express = require("express");
const postsController = require("../controllers/post");

const router = express.Router();

router.get("", postsController.getPosts);

router.post("/create", postsController.createPost);

module.exports = router;
