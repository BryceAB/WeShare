const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
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

exports.registerUser = async (req, res) => {
  const { name, username, password, email } = req.body;
  const [user, created] = await UsersModel.findOrCreate({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
    defaults: {
      name: name,
      username: username,
      passhash: password,
      email: email,
    },
  });
  if (created) {
    await ProfilesModel.findOrCreate({
      where: {
        userId: user.dataValues.id,
      },
      defaults: {
        userId: user.dataValues.id,
      },
    });
  }
  res.status(200).send({ created: created });
};
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  await UsersModel.findOne({
    where: {
      username: username,
    },
  })
    .then(async (res) => {
      if (res !== null) {
        await bcrypt.compare(
          password,
          res.data.dataValues.passhash,
          async (err, result) => {
            if (result) {
              const token = await tokenCreate(res.data.dataValues);
              res.status(200).send({ token: token, userId: user.id });
            } else {
              res.sendStatus(400);
            }
          }
        );
      } else {
        res.status(400).send("Invalid Login");
      }
    })
    .catch((err) => console.log(err));
};
exports.logoutUser = async (req, res) => {
  tokenDelete(req.body.jwt);
};
exports.deleteUser = async (req, res) => {
  const user = await tokenDescrambler(req.body.jwt);
  const userTBD = UsersModel.findOne({ where: { id: user.id } }).catch((err) =>
    console.log(err)
  );
  if (userTBD) {
    const userAuth = await bcrypt.compare(
      req.body.password,
      userTBD.passhash,
      (err, result) => {
        if (result) {
          UsersModel.destroy({
            where: {
              id: user.id,
            },
          });
          tokenDelete(req.body.jwt);
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      }
    );
  }
};
exports.getUser = async (req, res) => {
  const user = await UsersModel.findByPk(+req.params.id);
  res.status(200).send({ user: user });
};
