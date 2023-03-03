const { sequelize } = require("../../db");
const Sequelize = require("sequelize");
const { User } = require("./User");
const { Message } = require("./Message");

User.hasMany(Message);
Message.belongsTo(User);
Message.hasMany(User);

module.exports = { User, Message, sequelize, Sequelize };
