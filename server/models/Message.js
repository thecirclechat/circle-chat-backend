const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const Message = sequelize.define("message", {
  chatMessage: Sequelize.STRING,
});

module.exports = { Message };
