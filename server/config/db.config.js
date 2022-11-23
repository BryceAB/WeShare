const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

const config = require("./index");

dotenv.config({ path: require("find-config")(".env") });

const sequelize = new Sequelize(
  config.DB.DATABASE,
  config.DB.USER,
  config.DB.PASSWORD,
  {
    dialect: "mysql",
    host: config.DB.HOST,
  }
);

(async () => await sequelize.sync())().catch((err) => console.log(err));

module.exports = sequelize;
