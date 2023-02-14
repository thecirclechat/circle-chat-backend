const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
const router = express.Router();
const userRouter = require("./users");
const messageRouter = require("./messages");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use("/users", userRouter);
router.use("/messages", messageRouter);

//takes req.body of {username, password} and creates a new user with the hashed password
router.post("/register", async (req, res, next) => {
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
router.post("/login", async (req, res, next) => {
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

module.exports = router;
