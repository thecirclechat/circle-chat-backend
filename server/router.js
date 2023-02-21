const express = require('express');
const router = express.Router();

router.get('/', function (req,res) {
    res.sendFile(__dirname + '/home.html')
})
router.get('/messenger', function (req,res) {
    res.sendFile(__dirname + '/messenger.html')
})
module.exports = router;