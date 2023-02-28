const express = require("express");
const { OPEN_READWRITE } = require("sqlite3");
const router = express.Router();
// const userRouter = require("./user");
const messageRouter = require("./messages");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { application } = require("express");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;


// added for passport.js to work
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const {db} = require("../../db");
// end

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// router.use("/users", userRouter);
router.use("/messages", messageRouter);

// app.set('routes', path.join(__dirname, 'routes'));
// app.set('view engine', 'ejs');
router.get('/', function (req,res) {
  res.sendFile(__dirname + '/home.html')
})


//takes req.body of {username, password} and creates a new user with the hashed password
// router.post("/register", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
//     const { id, user } = await User.create({
//       username,
//       password: hashedPassword,
//     });
//     const token = jwt.sign({ id, user }, process.env.JWT_SECRET);
//     res.status(200).send({ message: "success", token });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}))


// Sessions
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
// 

router.get('/login', function(req, res, next) {
  res.render(__dirname + '/login.ejs')
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  
},console.log("password post route")));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


router.get('/register', function(req, res, next) {
  res.render(__dirname + '/signup.ejs')
});

// added signup route
router.post('/register', function(req, res, next) {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return next(err); }
      db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
        req.body.username,
        hashedPassword,
        salt
      ], function(err) {
        if (err) { return next(err); }
        var user = {
          id: this.lastID,
          username: req.body.username
        };
        req.login(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
      });
    });
  });
//takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
// router.post("/login", async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ where: { username } });
//     const isAMatch = await bcrypt.compare(password, user.password);
//     if (isAMatch) {
//       const token = jwt.sign({ user }, process.env.JWT_SECRET);
//       res.status(200).send({ message: "success", token });
//     } else {
//       res.status(401).send("Unauthorized");
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
module.exports = router;
