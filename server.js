const express= require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3050;
const router = require('./server/routes/index')

const models = require("./server/models")

// added to fix code
const passport = require('passport');
const session = require('express-session');
// 

// setting up sequilze with MySql
const env = require('dotenv').config()
// 
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

app.get('/', function (req, res) {
  res.send('Welcome to Circle Chat');
});

// not needed will delete later
app.listen(3306, function (err) {
  if (!err)
      console.log("Circle Chat is live");
  else console.log(err)
});
// 

// added express built-in body parser: express has a built-in middleware function that parses incoming requests with JSON payloads
app.use(express.urlencoded({
  extended: true 
  })
);
app.use(express.json());
// 

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// added for passport
// https://stackoverflow.com/questions/38886066/how-to-use-express-session
// For Passport 
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true, 
//   saveUninitialized: true
//   })); // session secret 
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// // 

// making our models work
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');
}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});
// 


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