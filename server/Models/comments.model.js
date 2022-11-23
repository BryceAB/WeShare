const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const CommentsModel = db.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  commentText: {
    type: DataTypes.TEXT,
  },
});

module.exports = CommentsModel;
