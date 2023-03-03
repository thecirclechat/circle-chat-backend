const {sequelize} = require('./db');
const { User } = require('./models/User');

const users = [
  {
      userName: "Lauren",
      password: "123"
  },
  {
      userName: "Krystal",
      password: "hello"
  },
  {
      userName: "Mariah",
      password: "circle"
  },
  {
      userName: "Mamragbe",
      password: "chat"
  }
]

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate({users});
};

seed()
  .then(() => {
    console.log('Seeding success. Users are in the chat');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });