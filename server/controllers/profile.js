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

exports.updateProfile = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  const profile = await ProfilesModel.findByPk(+req.params.id);
  let keyValue = Object.keys(req.body)[1];
  let pairValue = req.body[Object.keys(req.body)[1]];
  if (user.id === profile.dataValues.userId) {
    ProfilesModel.update(
      {
        [keyValue]: pairValue,
      },
      {
        where: { id: +req.params.id },
      }
    )
      .then(() => res.status(200).send({ msg: "Success" }))
      .catch((err) => console.log(err));
  } else {
    res.status(400).send("Invalid request");
  }
};
exports.getProfile = async (req, res) => {
  ProfilesModel.findOne({
    where: { id: +req.params.id },
    include: { model: UsersModel },
  })
    .then((DBres) => res.status(200).send(DBres))
    .catch((err) => console.log(err));
};
