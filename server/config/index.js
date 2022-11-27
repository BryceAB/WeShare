const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: require("find-config")(".env") });

const getEnvVariable = (key) => {
  const value = process.env[key];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`ENVIRONMENT VARIABLE '${key}' NOT SPECIFIED`);
  }
  return value;
};

const config = {
  DB: {
    HOST: getEnvVariable("HOST"),
    USER: getEnvVariable("USER"),
    DATABASE: getEnvVariable("DATABASE"),
    PASSWORD: getEnvVariable("PASSWORD"),
    DBURI: getEnvVariable("DBURI"),
  },
  JWT: {
    SECRET: getEnvVariable("JWT_SECRET"),
    EXPIRES_IN: getEnvVariable("JWT_EXPIRES_IN"),
  },
};

module.exports = config;
