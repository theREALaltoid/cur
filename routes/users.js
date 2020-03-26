let express = require("express");
const bodyParser = require("body-parser");
let User = require("../models/user");
let passport = require("passport");
let userRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");
userRouter.use(bodyParser.json());
userRouter.route("*").options((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendStatus(200);
});
/* GET users listing. */
userRouter
  .route("/")

  .get(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      User.find({})
        .then(
          users => {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.json(users);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

userRouter.post("/signup", cors.corsWithOptions, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.json({ user: "exists" });
      } else {
        user.save((err, user) => {
          if (err) {
            res.statusCode = 200;
            res.json({ user: "exists" });
          }
          passport.authenticate("local")(req, res, () => {
            let token = authenticate.getToken({ _id: req.user._id });
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.json({ JWT: token });
          });
        });
      }
    }
  );
});

userRouter.post("/login", cors.corsWithOptions, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 401;
      res.json({
        success: false,
        err: err,
        status: "Login Failed"
      });
    } else {
      req.logIn(user, err => {
        if (err) {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 401;
          res.json({
            success: false,
            err: err,
            status: "Login Failed"
          });
        } else {
          let token = authenticate.getToken({ _id: req.user._id });
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.json({ JWT: token });
        }
      });
    }
  })(req, res, next);
});

userRouter.get("/checkJWTtoken", cors.corsWithOptions, (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return console.log(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT invalid!", success: false, err: info });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      return res.json({ status: "JWT valid!", success: true, user: user });
    }
  })(req, res);
});
module.exports = userRouter;
