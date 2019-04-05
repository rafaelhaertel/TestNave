// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  userid: Schema.ObjectId,
  content: String,
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('comments', Comment);
