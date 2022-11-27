const { Op, Sequelize } = require("sequelize");
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
const sequelize = require("../config/db.config");

exports.createPost = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  if (user) {
    const DBres = PostsModel.create({
      postText: req.body.post,
      userId: user.id,
    });
    res.status(200).send({ msg: "Successfully posted" });
  } else {
    res.status(400).send({ err: "Invalid Token" });
  }
};
exports.deletePost = async (req, res) => {
  const post = await PostsModel.findByPk(+req.params.id);
  PostsModel.destroy({
    where: {
      id: post.dataValues.id,
    },
  });
};
exports.getAllPostsandComments = async (req, res) => {
  PostsModel.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: UsersModel,
      },
      {
        model: CommentsModel,
        order: [["createdAt", "DESC"]],
        include: {
          model: UsersModel,
        },
      },
    ],
  })
    .then((DBres) => res.status(200).send(DBres))
    .catch((err) => console.log(err));
};
exports.getPostandAllComments = async (req, res) => {
  PostsModel.findOne({
    where: { id: +req.params.id },
    include: [
      {
        model: UsersModel,
      },
      {
        model: CommentsModel,
        order: [["createdAt", "ASC"]],
        include: {
          model: UsersModel,
        },
      },
    ],
  })
    .then((DBres) => res.status(200).send(DBres))
    .catch((err) => console.log(err));
};
exports.updatePost = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  const post = await PostsModel.findByPk(+req.params.id);
  if (user === undefined || post === null) {
    res.status(400).send({ err: "Cannot update post" });
  } else {
    if (user.id === post.dataValues.userId || 0) {
      PostsModel.update(
        {
          postText: req.body.post,
        },
        {
          where: {
            id: post.dataValues.id,
          },
        }
      );
      res.status(200).send({ msg: "Success" });
    } else {
      res.status(400).send({ err: "Cannot update post" });
    }
  }
};
