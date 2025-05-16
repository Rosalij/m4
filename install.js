require("dotenv").config();
const mongoose = require("mongoose");



//MongoDB connection via Mongoose
mongoose.connect(process.env.DATABASE, {
})
.then(() => console.log("MongoDB database connected"))
.catch((err) => console.error("MongoDB connection error:", err));

//mongodb user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);