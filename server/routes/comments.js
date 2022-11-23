"use strict";
const express = require("express");
const { updateComment } = require("../controllers/comments");
let router = express.Router();
const {
  userController,
  postController,
  commentController,
  profileController,
} = require("../controllers/index");

router.route("/").post(commentController.createComment);

router
  .route("/:id")
  .post(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
