const { sequelize , Sequelize} = require("../db");

const Message = sequelize.define('message', {
  chatMessage: Sequelize.STRING,
});

module.exports = { Message };
