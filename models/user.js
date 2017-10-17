var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
    },
  password: {
      type: String,
      required: true
    }
});

userSchema.methods.encryptPassword = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
