const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
let Schema = mongoose.Schema;
let User = new Schema({
  admin: {
    type: Boolean,
    default: false
  }
});
let options = { limitAttempts: true, maxAttempts: 1 };
User.plugin(passportLocalMongoose, options);
module.exports = mongoose.model("User", User);
