//TODO: this would be for the model importing and setting up associations

//dependencies 
const { sequelize } = require("../db");
const Sequelize = require("sequelize");

//import user models
const { User } = require("./User");
const { Message } = require("./Message");

//data associations
User.hasMany(Message);
Message.belongsTo(User);

// Assume user ID is stored in a variable called userId
User.findByPk(username, {
  include: [{
    model: Message
  }]
}).then(user => {
  // user.messages will contain all messages associated with this user
  console.log(user.messages);
});


module.exports = { User, Message, sequelize, Sequelize };

