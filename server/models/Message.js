const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

const Message = sequelize.define("message", {
  chatMessage: Sequelize.STRING,
  sender: Sequelize.STRING,
  conversationId:Sequelize.STRING,
});

module.exports = Message;
