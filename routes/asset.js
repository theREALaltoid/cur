var express = require("express");
var router = express.Router();
let Asset = require("../models/asset");
const authenticate = require("../authenticate");
const cors = require("./cors");

/* GET users listing. */
router.route("*").options((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1234");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  res.sendStatus(200);
});
router
  .route("/")
  //Returns Assets For specified User
  .get(cors.corsWithOptions, authenticate.verifyUser, function(req, res, next) {
    Asset.find({ postedBy: req.user._id })
      .then(
        assets => {
          res.statusCode = 200;
          res.json(assets);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  //Creates asset object for user
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
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
  })

  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyListOwner,
    function(req, res, next) {
      Asset.remove({ _id: req.body.postToDelete })
        .then(
          assets => {
            res.statusCode = 200;
            res.json("Asset Deleted");
          },
          err => next(err)
        )

        .catch(err => next(err));
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyListOwner,
    function(req, res, next) {
      Asset.updateOne({ _id: req.body.postToUpdate }, { $set: req.body })
        .then(
          assets => {
            res.statusCode = 200;
            res.json(assets);
          },
          err => next(err)
        )

        .catch(err => next(err));
    }
  );

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
      } else {
        console.log(asset);
      }
    });
  });

module.exports = router;
