let express = require("express");
const bodyParser = require("body-parser");
let User = require("../models/user");
let passport = require("passport");
let userRouter = express.Router();
const authenticate = require("../authenticate");
const cors = require("./cors");
userRouter.use(bodyParser.json());
userRouter.route("*").options((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(users);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

userRouter.post("/signup", cors.cors, (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      console.log(req.body);
      if (err) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ user: "exists" });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
            user.save((err, user) => {
              if (err) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");

                res.json({ user: "exists" });
              }
              passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("Registration Successful!");
              });
            });
          }
        }
      }
    }
  );
});

userRouter.post(
  "/login",
  cors.cors,

  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          err: info,
          status: "Login Failed"
        });
      }
      req.logIn(user, err => {
        if (err) {
          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            err: "Couldn't login user",
            status: "Login Failed"
          });
        }
        let token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          JWT: token
        });
      });
    })(req, res, next);
  }
);

userRouter.get("/logout", cors.corsWithOptions, (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    let err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
    response.end();
  }
});

userRouter.get("/checkJWTtoken", cors.cors, (req, res) => {
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
