const { DataTypes } = require("sequelize");
const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const UsersModel = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passhash: {
    type: DataTypes.STRING,
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("passhash", hash);
    },
  },
  imgUrl: {
    type: DataTypes.STRING,
    defaultValue: "/defaultImage.jpg",
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = UsersModel;
