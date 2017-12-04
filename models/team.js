var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teamSchema = new Schema({
  _id: String,
  city: String,
  country: String,
  key: String,
  name: String,
  nickname: String,
  state_prov: String,
  team_number: String
});

module.export = mongoose.model('Team', teamSchema);
