//dependencies
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Message = require("../models/Message")
const User = require("../models/User")

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Get all the messages and render messages page
router.get('/', async (req,res) => {
  res.sendFile(__dirname + '/messenger.html')
})

router.post('/', async(req,res,next)=>{
    try{
    const chatMessage = req.body;
    const message = await Message.create(chatMessage)
    res.send(chatMessage)
    } catch (error) {
      next(error)
    }
});

/*router.get("/:conversationId", async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  */



  module.exports = router