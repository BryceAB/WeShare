const { Op } = require("sequelize");
const {
  UsersModel,
  PostsModel,
  ProfilesModel,
  CommentsModel,
} = require("../Models/index");
const {
  tokenCreate,
  tokenDelete,
  tokenDescrambler,
} = require("../helpers/jwt");

exports.createComment = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  if (user) {
    const DBres = CommentsModel.create({
      commentText: req.body.comment,
      postId: +req.body.postId,
      userId: user.id,
    });
    res.status(200).send({ msg: "Successfully posted" });
  } else {
    res.status(400).send({ err: "Invalid Token" });
  }
};
exports.deleteComment = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  const comment = await CommentsModel.findByPk(+req.params.id);
  if (user === undefined || comment === null) {
    res.status(400).send({ err: "Cannot delete comment" });
  } else {
    if (user.id === comment.dataValues.userId || 0) {
      CommentsModel.destroy({
        where: {
          id: comment.dataValues.id,
        },
      });
      res.status(200).send({ msg: "Success" });
    } else {
      res.status(400).send({ err: "Cannot delete comment" });
    }
  }
};
exports.updateComment = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  const comment = await CommentsModel.findByPk(+req.params.id);
  if (user === undefined || comment === null) {
    res.status(400).send({ err: "Cannot update comment" });
  } else {
    if (user.id === comment.dataValues.userId || 0) {
      CommentsModel.update(
        {
          commentText: req.body.comment,
        },
        {
          where: {
            id: +req.params.id,
          },
        }
      );
      res.status(200).send({ msg: "Success" });
    } else {
      res.status(400).send({ err: "Cannot update comment" });
    }
  }
};
