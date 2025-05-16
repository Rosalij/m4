
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 author: {
    type: String,   
    required: true,
},
    textinput: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post