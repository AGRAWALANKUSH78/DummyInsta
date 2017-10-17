var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title : String,
  description : String,
  photoUrl : String,
  time : Date,
  like : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
          }],
  comment : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
          }],
  userId : { 
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'User' }
});

module.exports = mongoose.model('Post', postSchema);
