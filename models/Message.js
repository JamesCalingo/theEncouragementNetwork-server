const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: String,
  createdAt: String,
  userName: String,
  likes: {
    type: Number,
    default: 0,
  },
  flagged: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' 
  }
});

module.exports = mongoose.model("Message", MessageSchema);
