const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const assetSnap = new Schema({
  date: {
    type: Date,
    required: true
  },
  spotPrice: {
    type: Number,
    required: true,
    min: 0
  }
});
module.exports = mongoose.model("Spot", assetSnap);
