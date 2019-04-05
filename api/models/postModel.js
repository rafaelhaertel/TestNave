// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./commentModel.js').schema;

var Post = new Schema({
  userid: Schema.ObjectId,
  content: String,
  date: {
    type: Date,
    default: Date.now
  },
  comments: [Comment]
});

module.exports = mongoose.model('posts', Post);
