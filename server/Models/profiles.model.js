const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const ProfilesModel = db.define("profiles", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  about: {
    type: DataTypes.TEXT,
  },
  interests: {
    type: DataTypes.TEXT,
  },
  goals: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
});

module.exports = ProfilesModel;
