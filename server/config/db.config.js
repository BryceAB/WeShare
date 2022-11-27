const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");

const config = require("./index");

dotenv.config({ path: require("find-config")(".env") });

const sequelize = new Sequelize(config.DB.DBURI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

(async () => await sequelize.sync())().catch((err) => console.log(err));

module.exports = sequelize;
