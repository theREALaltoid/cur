let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let User = require("./models/user");

let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let jwt = require("jsonwebtoken");
let config = require("./config.js");
const Asset = require("./models/asset");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 36000 });
};
var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(
    opts,

    (jwt_payload, done) => {
      console.log("JWT payload ", jwt_payload);
      User.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          return done(err, false);
        } else if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyAdmin = (req, err, next) => {
  console.log(req.user.admin);
  if (req.user.admin == false) {
    err = new Error("You are not an admin. Access Denied");
    err.status = 403;
    return next(err);
  } else {
    next();
  }
};
exports.verifyPoster = (req, err, next) => {};

exports.verifyListOwner = (req, err, next) => {
  let id = req.user._id;

  Asset.findOne({ postedBy: req.user._id }, (err, user) => {
    if (user) {
      next();
    } else {
      err = new Error("You are not an the author. Access Denied");
      err.status = 403;
      return next(err);
    }
  });
};
