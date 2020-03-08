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
    Spot.find({
      date: {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
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
          console.log("all assets found ", assets);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json("An Api call WASNT made" + assets);
        } else {
          let endDate = moment(req.query.endDate)
            .format("YYYY-MM-DD")
            .toString();
          let startDate = moment(req.query.startDate)
            .format("YYYY-MM-DD")
            .toString();
          let apiUrl =
            "https://metals-api.com/api/timeseries?access_key=" +
            process.env.metalsApi +
            "&start_date=" +
            startDate +
            "&end_date=" +
            endDate +
            "&symbols=XAG&base=USD";

          fetch(apiUrl)
            .then(res => res.json())
            //
            .then(json => {
              for (const property in json.rates) {
                Spot.update(
                  { date: property },
                  { $set: { spotPrice: 1 / json.rates[property].XAG } },
                  { upsert: true },
                  (err, task) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
              Spot.find({
                date: {
                  $gte: new Date(req.query.startDate),
                  $lte: new Date(req.query.endDate)
                }
              }).then(assets => {
                console.log("assets Created ", assets);
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json("An Api call WAS made" + assets);
              });
            });

          //
        }
      })

      .catch(err => next(err));
  })
  .post(cors.cors, function(req, res, next) {
    for (const property in req.body.rates) {
      Spot.create({
        date: property,
        spotPrice: 1 / req.body.rates[property].XAG
      });
    }
    Spot.find({
      date: {
        $gte: req.params.startDate,
        $lt: req.params.endDate
      }
    })
      .then(
        assets => {
          let i = Object.keys(req.body.rates);
          console.log("assets Created ", assets);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(req.body.rates[i]);
        },
        err => next(err)
      )

      .catch(err => next(err));
  });

module.exports = router;
