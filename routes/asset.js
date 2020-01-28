var express = require("express");
var router = express.Router();
let Asset = require("../models/asset");
const authenticate = require("../authenticate");

/* GET users listing. */
router
  .route("/")

  //Returns Assets For specified User
  .get(function(req, res, next) {
    Asset.find({})
      .then(
        assets => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  //Creates asset object for user
  .post(authenticate.verifyUser, (req, res, next) => {
    req.body.postedBy = req.user._id;
    Asset.create(req.body)
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
router
  .route("/:assetId")
  ///Just Gets the specified asset
  .get(function(req, res, next) {
    Asset.findById(req.params.assetId)
      .then(
        assets => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(assets);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  //Updates specified asset
  .post(authenticate.verifyUser, function(req, res, next) {
    let id1 = req.user._id;

    Asset.findById(req.params.assetId).then(asset => {
      if (id1.equals(asset._id)) {
        console.log(asset);
      } else {
        console.log(asset);
      }
    });
  });

module.exports = router;
