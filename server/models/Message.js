<<<<<<< HEAD
const { sequelize , Sequelize} = require("../db");
=======
const { sequelize } = require("../../db");
const { Sequelize } = require("sequelize");
>>>>>>> ae62db4569d5f3dc5d9f8ad85833f3878c66c52d

const Message = sequelize.define('message', {
  chatMessage: Sequelize.STRING,
});

module.exports = { Message };
