import mongoose from 'mongoose';

const replySchema = mongoose.Schema({
  reply: String,
  time: Date,
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

const Reply = mongoose.model('Reply', replySchema);
export { Reply };