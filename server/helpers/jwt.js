const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let activeTokens = [];

module.exports = {
  tokenCreate: async (user) => {
    const token = await jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    activeTokens.push(token);
    return token;
  },
  tokenDelete: async (token) => {
    activeTokens = activeTokens.filter((val) => val !== token);
  },
  tokenDescrambler: async (token) => {
    if (token) {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } else {
      return undefined;
    }
  },
};
