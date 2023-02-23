const express= require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const router = require('./server/router')
const messageRoute = require("./server/routes/messages")
const userRoute = require("./server/routes/user")

app.use(router)
app.use(express.json())

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.use("/chat/messages", messageRoute)
app.use("/chat/auth", userRoute)

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});