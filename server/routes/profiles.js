"use strict";
const express = require("express");
let router = express.Router();
const {
  userController,
  postController,
  commentController,
  profileController,
} = require("../controllers/index");
const { ProfilesModel } = require("../Models");

router
  .route("/:id")
  .post(profileController.updateProfile)
  .get(profileController.getProfile);

module.exports = router;
