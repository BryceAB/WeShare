const UsersModel = require("./users.model");
const PostsModel = require("./posts.model");
const CommentsModel = require("./comments.model");
const ProfilesModel = require("./profiles.model");

UsersModel.hasMany(PostsModel, {
  foreignKey: { name: "userId", allowNull: false },
});
PostsModel.belongsTo(UsersModel);

UsersModel.hasMany(CommentsModel, {
  foreignKey: { name: "userId", allowNull: false },
});
CommentsModel.belongsTo(UsersModel);

UsersModel.hasOne(ProfilesModel, {
  foreignKey: { name: "userId", allowNull: false },
});
ProfilesModel.belongsTo(UsersModel);

PostsModel.hasMany(CommentsModel, {
  foreignKey: { name: "postId", allowNull: false },
});
CommentsModel.belongsTo(PostsModel);

module.exports = {
  UsersModel,
  PostsModel,
  CommentsModel,
  ProfilesModel,
};
