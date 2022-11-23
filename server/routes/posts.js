"use strict";
const express = require("express");
let router = express.Router();
const {
  userController,
  postController,
  commentController,
  profileController,
} = require("../controllers/index");
const { createPost } = require("../controllers/posts");

router.route("/").post(postController.createPost);

router
  .route("/:id")
  .put(postController.getAllPostsandComments)
  .get(postController.getPostandAllComments)
  .post(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
