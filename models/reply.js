var mongoose = require('mongoose');

var replySchema = mongoose.Schema({
  reply: String,
  time: Date,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Reply', replySchema);
