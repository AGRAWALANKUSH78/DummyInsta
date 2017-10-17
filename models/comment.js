var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  comment: String,
  time: Date,
  reply : [{
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Reply'
            }],
  user : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'User'
            }
});

module.exports = mongoose.model('Comment', commentSchema);
