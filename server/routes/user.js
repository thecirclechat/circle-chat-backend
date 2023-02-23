const express = require("express");
const router = express.Router()
const { OPEN_READWRITE } = require("sqlite3");
const app = express();
//const { User, Message } = require("./db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Once authorization/authentication middleware is created, we need to make we add that to each route, so that each CRUD route is only accessible once the user has logged in */

//takes req.body of {username, password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const { id, user } = await User.create({
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id, user }, process.env.JWT_SECRET);
    res.status(200).send({ message: "success", token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    const isAMatch = await bcrypt.compare(password, user.password);
    if (isAMatch) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.status(200).send({ message: "success", token });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router