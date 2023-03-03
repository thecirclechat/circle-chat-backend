// load environment variables from .env or elsewhere
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// added sessions
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");

const SQLiteStore = require("connect-sqlite3")(session);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");

const app = express();

app.locals.pluralize = require("pluralize");

//Allow CORS requests
app.use(cors());

// logging middleware
app.use(morgan("dev"));

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, "../dist")));

//
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// added for establishing sessions
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));
//

//testing a get route to api to ensure get will work with middleware when loading up localhost:3000
app.get("/", async (req, res) => {
  res.send("hello world");
});

// api router
app.use("/api", require("./routes/index"));

app.use("/", indexRouter);
app.use("/", userRouter);

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
