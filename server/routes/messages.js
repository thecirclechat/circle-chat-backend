const express = require("express");
const router = express.Router();
const { Message } = require("../models/index");

// GET Messages
router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.send(messages);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//GET one message
router.get("/:id", async (req, res, next) => {
  try {
    const message = await Message.findByPk(req.params.id);
    res.send(message);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//POST message
router.post("/", async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.send(message);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//UPDATE(PUT/PATCH) message
router.get("/:id", async (req, res, next) => {
  try {
    const updateMessage = await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(updateMessage);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE message
router.delete("/:id", async (req, res, next) => {
  try {
    const deleteMessage = await Message.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(await Message.findAll());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
