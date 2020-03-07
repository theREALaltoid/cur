var express = require("express");
var router = express.Router();
let Spot = require("../models/spotPrice");
let apiKey = process.env.alphaKey;

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
        $gte: req.params.startDate,
        $lt: req.params.endDate
      }
    })
      .then(
        spots => {
          if (spots.length == req.params.endDate - req.params.startDate) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(spots + true);
          } else {
            console.log(process.env.alphaKey);
            end_date = req.params.endDate;
            start_date = req.params.startDate;
            fetch(
              "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=" +
                process.env.alphaKey,
              {
                method: "GET"
              }
            )
              .then(response => response.json())

              .then(response => {
                Spot.create({
                  date:
                    response["Realtime Currency Exchange Rate"][
                      "6. Last Refreshed"
                    ],
                  spotPrice: parseFloat(
                    response["Realtime Currency Exchange Rate"]["9. Ask Price"]
                  )
                }).then(
                  assets => {
                    console.log("assets Created ", assets);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(assets);
                  },
                  err => next(err)
                );
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
