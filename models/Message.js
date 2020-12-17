const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: String,
  createdAt: String,
  
  likes: {
    type: Number,
    default: 0,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
