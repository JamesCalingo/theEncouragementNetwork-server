const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  flagged: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", UserSchema);
