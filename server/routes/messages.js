//dependencies
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Message = require("../models/Message")

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async(req,res)=>{
    const newMessage = req.body;
    Message.create({newMessage})
    .then(message => res.send(`Chat message ${message.newMessage}`))
    .catch(err => res.send(`Error adding new message: ${err.message}`))
    console.log(newMessage)

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router