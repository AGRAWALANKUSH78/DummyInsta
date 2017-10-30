import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
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

const Comment = mongoose.model('Comment', commentSchema);
export { Comment };