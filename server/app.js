// load environment variables from .env or elsewhere
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const indexRouter = require('./routes/index');



// added sessions
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);
// 
// const authRouter = require('./routes/auth'); 
//Allow CORS requests
app.use(cors());

// logging middleware
app.use(morgan("dev"));

// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, "../dist")));


// added for establishing sessions
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
// 

//testing a get route to api to ensure get will work with middleware when loading up localhost:3000
app.get("/", async (req, res) => {
  res.send("hello world");
});

// api router
app.use("/api", require("./routes/index"));

app.use('/', indexRouter);

//testing a get route to api to ensure get will work with middleware when loading up localhost:3000/api
app.get("/api", async (req, res) => {
  res.send("api is running");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: "404 - Not Found", message: "No route found for the requested URL" });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message, table: error.table });
});

module.exports = app;
