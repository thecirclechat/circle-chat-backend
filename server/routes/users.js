const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/index");

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await user.findAll();
    // const data = await items.json();
    res.send(users);
  } catch (error) {
    next(error);
  }
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



module.exports = userRouter;
