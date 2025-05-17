const mongoose = require('mongoose');


//mongodb user schema
//this schema is used to store users in the database
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User