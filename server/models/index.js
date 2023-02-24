//TODO: this would be for the model importing and setting up associations

//dependencies 
const { sequelize } = require("../../db");
const Sequelize = require("sequelize");

//import user models
const { User } = require("./User");
const { Message } = require("./Message");

//data associations
User.hasMany(Message);
Message.belongsTo(User);s




module.exports = { User, Message, sequelize, Sequelize };

