var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: String,
  teams: [String],
  name: String
});

module.export = mongoose.model('User', userSchema);
