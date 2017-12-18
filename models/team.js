var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  _id: String,
  city: String,
  country: String,
  key: String,
  name: String,
  nickname: String,
  state_prov: String,
  team_number: String
});

TeamSchema
  .virtual('full_name')
  .get(function() {
    return this.team_number + ' | ' + this.name;
  });

TeamSchema.statics.findByNumberOrName = function(val, cb) {
  var regEx = new RegExp(`/${val.trim()}/i`)
  return this.findOne({ $or: [{ name: regEx }, { team_number: regEx }]}, cb).sort( { team_number: 1 } );
}


module.exports = mongoose.model('Team', TeamSchema);
