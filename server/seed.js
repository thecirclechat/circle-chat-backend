const {sequelize} = require('./db');
const {User} = require('./models/User');
const { user } = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate(user);
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