var express = require("express");
var router = express.Router();
let Spot = require("../models/spotPrice");
const authenticate = require("../authenticate");
const cors = require("./cors");
let fetch = require("node-fetch");
let start_date;
let end_date;
let metalsURL =
  "https://metals-api.com/api/timeseries?access_key=" +
  "&start_date=" +
  start_date +
  "&end_date=" +
  end_date;
/* GET users listing. */
router.route("*").options((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendStatus(200);
});
router
  .route("/")

  //Returns Assets For specified User
  .get(cors.cors, function(req, res, next) {
    Spot.find({})
      .then(
        spots => {
          if (spots.length == req.query.end_date - req.query.start_date) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(spots);
          } else {
            console.log(process.env.metalsApi);
            end_date = req.query.end_date;
            start_date = req.query.start_date;
            fetch(
              "https://metals-api.com/api/timeseries?access_key=" +
                process.env.metalsApi +
                "&start_date=" +
                start_date +
                "&end_date=" +
                end_date,
              {
                method: "GET",
                headers: { "Content-Type": "application/json" }
              }
            )
              .then(response => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(response);
              })

              .catch(err => {
                console.log(err);
              });
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = router;
