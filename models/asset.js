const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const assetType = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  asset: {
    type: String,
    required: true
  },
  ouncesIn: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  sellDate: {
    type: Date
  },
  purchasePrice: {
    type: Currency,
    required: true,
    min: 0
  },
  sellPrice: {
    type: Currency,
    required: true,
    min: 0
  },
  assetValue: {
    type: Currency,
    required: true,
    min: 0
  }
});
module.exports = mongoose.model("Asset", assetType);
