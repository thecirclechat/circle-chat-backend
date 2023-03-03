const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
const router = express.Router();
const messageRouter = require("./messages");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// added for passport.js to work
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const { db } = require("../../db");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    db.get("SELECT * FROM users WHERE username = ?", [username], function (err, row) {
      if (err) {
        return cb(err);
      }
      if (!row) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      crypto.pbkdf2(password, row.salt, 310000, 32, "sha256", function (err, hashedPassword) {
        if (err) {
          return cb(err);
        }
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: "Incorrect username or password." });
        }
        return cb(null, row);
      });
    });
  })
);

// added for establishing sessions
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.use("/messages", messageRouter);

router.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/home.html");
});

router.get("/login", function (req, res, next) {
  res.render(__dirname + "/views/login.ejs");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/register", function (req, res, next) {
  res.render(__dirname + "/views/signup.ejs");
});

// added signup route
router.post("/register", function (req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    db.run(
      "INSERT or IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
      [req.body.username, hashedPassword, salt],
      function (err) {
        if (err) {
          return next(err);
        }
        var user = {
          id: this.lastID,
          username: req.body.username,
        };
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/messages/_id" + req.user.username);
        });
      }
    );
  });
});

module.exports = router;
