//dependencies
const express = require('express')
const router = express.Router()
const { Message } = require("../models/Message")
//const { sequelize } = require("../db")
// const User = require()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userMessages = []

//Get all the messages and render messages page
router.get('/', async (req,res) => {
  res.sendFile(__dirname + '/messenger.html')
})

//post all the messages to the database
  router.post('/', async(req,res,next)=>{
    try{
      const newMessage = req.body;
      const message = await Message.create({newMessage})
      console.log(newMessage)
    res.render( {message} )
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