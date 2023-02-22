const { sequelize } = require("../../db");
const Sequelize = require("sequelize");
const { User } = require("./User");
const { Message } = require("./Message");

module.exports = { User, Message, sequelize, Sequelize };
