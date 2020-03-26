var express = require("express");
var router = express.Router();
let Spot = require("../models/spotPrice");
let apiKey = process.env.metalsApi;
var moment = require("moment");
const authenticate = require("../authenticate");
const cors = require("./cors");
let fetch = require("node-fetch");
let start_date;
let end_date;

/* GET users listing. */
router.route("*").options((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.sendStatus(200);
});
router
  .route("/")

  //Returns Assets For specified User
  .get(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    let startDate = moment(req.query.startDate)
      .format("YYYY-MM-DD")
      .toString();
    let endDate = moment(req.query.endDate)
      .format("YYYY-MM-DD")
      .toString();
    Spot.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    })
      .then(assets => {
        if (
          assets.length >
          moment(req.query.endDate).diff(moment(req.query.startDate), "days")
        ) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        } else {
          let metalsURL =
            "https://metals-api.com/api/timeseries?access_key=" +
            process.env.metalsApi +
            "&start_date=" +
            startDate +
            "&end_date=" +
            moment(req.query.endDate).format("YYYY-MM-DD") +
            "&symbols=XAG&base=USD";
          if (
            moment(req.query.endDate).diff(
              moment(req.query.startDate),
              "days"
            ) <= 365
          ) {
            fetch(metalsURL)
              .then(res => res.json())
              .then(json => {
                console.log(metalsURL);

                console.log(json);

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
                  res.json(assets);
                });
              });
          } else if (
            moment(req.query.endDate).diff(
              moment(req.query.startDate),
              "days"
            ) > 365
          ) {
            //startDate starts as the requested startDate then middleDate
            //adds 365 days as it
            //progressively gets closer to the end date
            let startDate = moment(req.query.startDate).format();

            let middleDate = moment(startDate)
              .add(364, "days")
              .format();

            let endDate = moment(req.query.endDate).format();

            while (moment(endDate).diff(moment(middleDate), "days") > 0) {
              fetch(
                "https://metals-api.com/api/timeseries?access_key=" +
                  process.env.metalsApi +
                  "&start_date=" +
                  moment(startDate).format("YYYY-MM-DD") +
                  "&end_date=" +
                  moment(middleDate).format("YYYY-MM-DD") +
                  "&symbols=XAG&base=USD"
              )
                .then(res => res.json())
                .then(json => {
                  console.log(json.rates);
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
                    ).then((startDate = middleDate));
                  }
                });
              startDate = moment(middleDate)
                .add(1, "days")
                .format();
              middleDate = moment(middleDate)
                .add(364, "days")
                .format();
              console.log(middleDate);
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
              res.json(assets);
            });
          }
        }
      })

      .catch(err => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, function(
    req,
    res,
    next
  ) {
    for (const property in req.body.rates) {
      Spot.update(
        { date: moment(property).format() },
        { $set: { spotPrice: 1 / req.body.rates[property].XAG } },
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
