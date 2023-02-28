const express= require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const router = require('./server/routes/index')
const {sequelize} = require('./server/db')
//const messageRoute = require("./server/routes/messages")
//const userRoute = require("./server/routes/user")

app.use(router)
app.use(express.json())
//app.use("/chat/messages", messageRoute)
//app.use("/chat/auth", userRoute)


io.on('connection', (socket) => {
  console.log('A user is connected')

  socket.on('chat message', msg => {
    console.log('message: ' +msg)
    
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  sequelize.sync({force:false})
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});