const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const PostsModel = db.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  postText: {
    type: DataTypes.TEXT,
  },
});

module.exports = PostsModel;
