const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const assetType = new Schema({
  asset: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: String,
    required: true
  },
  sellDate: {
    type: String
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
  }
});
