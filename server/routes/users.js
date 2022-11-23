"use strict";
const express = require("express");
let router = express.Router();
const {
  userController,
  postController,
  commentController,
  profileController,
} = require("../controllers/index");
const { loginUser } = require("../controllers/users");

router.route("/").post(userController.registerUser);

router
  .route("/:id")
  .put(userController.logoutUser)
  .post(userController.loginUser)
  .delete(userController.deleteUser)
  .get(userController.getUser);

module.exports = router;
