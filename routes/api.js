var express = require("express");
var router = express.Router();
let Spot = require("../models/spotPrice");
let apiKey = process.env.alphaKey;
var moment = require("moment");
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
    let startDate = moment(req.query.startDate)
      .subtract(2, "days")
      .format()
      .toString();
    Spot.find({
      date: {
        $gte: startDate,
        $lte: req.query.endDate
      }
    })
      .then(assets => {
        if (
          assets.length ==
          parseInt(
            (new Date(req.query.endDate) - new Date(req.query.startDate)) /
              (1000 * 60 * 60 * 24)
          )
        ) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        } else {
          console.log(
            parseInt(
              (new Date(req.query.endDate) - new Date(req.query.startDate)) /
                (1000 * 60 * 60 * 24)
            )
          );
          console.log("all no found ");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        }
      })

      .catch(err => next(err));
  })
  .post(cors.cors, function(req, res, next) {
    Spot.find({
      date: {
        $gte: req.query.startDate,
        $lt: req.query.endDate
      }
    })
      .then(
        assets => {
          console.log("assets Created ", assets);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        },
        err => next(err)
      )

      .catch(err => next(err));
  });

module.exports = router;
