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

// const express = require("express");
// // const app = express();
// const app = require("./server/app");
// const PORT = process.env.PORT || 3000;
// const { sequelize } = require("./server/models/index");

// app.use(express.static("public"));

// const init = async () => {
//   try {
//     await sequelize.sync();

//     app.listen(PORT, () => {
//       console.log(`Server listening at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// };

// init();