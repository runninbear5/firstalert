var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: String,
  teams: [String],
  name: String,
  email: String,
  phoneNumber: Number,
  prefrence: String
});

module.export = mongoose.model('User', userSchema);
