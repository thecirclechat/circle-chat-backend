const express= require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const router = require('./server/routes/index')
//const messageRoute = require("./server/routes/messages")
//const userRoute = require("./server/routes/user")

app.use(router)
app.use(express.json())
//app.use("/chat/messages", messageRoute)
//app.use("/chat/auth", userRoute)


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});