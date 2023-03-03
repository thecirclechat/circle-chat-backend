const express = require("express");
const { User } = require("../models/User");
const { sequelize } = require('../db');
const router = express.Router();
const seedData = require('../seedData')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/seed', async (req, res) => {
  try {
    // Sync the User model with the database
    await sequelize.sync({ force: true });

    // Create new User instances from the seed data and save them to the database
    await Promise.all(seedData.users.map(async (userData) => {
      await User.create(userData);
    }));

    res.send('Database seeded successfully!');
  } catch (error) {
    console.error(error); 
    res.status(500).send('Error seeding database'); 
  }
});

// Get all the users and render users page
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.json(users)
  } catch (error) {
    console.error(error); 
    res.status(500).send('Error retrieving users from database'); 
  }
});

router.get('/', (req,res) => {
  res.sendFile(__dirname + '/user.html')
})

module.exports = router;
/*const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
//const { User, Message } = require("./db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const router = express.Router();
//const { User } = require("../models/index");

// GET all users
router.get("/", async (req, res, next) => {
  /*try {
    console.log("Hello"); // Testing to make sure that route is being reached by printing out to the console 
    const users = await User.findAll();
    // const data = await items.json();
    res.send(users);
    
  } catch (error) {
    next(error);
  }
  res.sendFile(__dirname + '/home.html')
});

//GET one user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//POST user
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//UPDATE user
router.put("/:id", async (req, res, next) => {
  try {
    const updateUser = await Item.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updateUser);
  } catch (error) {
    next(error);
  }
});

//DELETE user
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(await User.findAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
*/