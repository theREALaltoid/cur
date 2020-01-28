let createError = require("http-errors");
let express = require("express");
let path = require("path");
let userRouter = require("./routes/users");

let passport = require("passport");
let authenticate = require("./authenticate");
let config = require("./config.js");
let logger = require("morgan");
let assetRouter = require("./routes/asset");

let cookieParser = require("cookie-parser");
let app = express();
mongoose = require("mongoose");

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
  db => {
    console.log("Connected correctly to server");
  },
  err => {
    console.log(err);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser("12345-67890-09876-54321"));
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));
app.use("/asset", assetRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
