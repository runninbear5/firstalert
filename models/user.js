var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: { type: String},
  first_name: { type: String, trim: true },
  last_name: { type: String, trim: true },
  email: { type:String, trim: true },
  mobile: { type: String, trim: true },
  verification_status: { type: String, required: true, enum: ['Unverified, Verified'], default: 'Unverified' },
  created_at: { type: Date, default: Date.now },

  notification_settings: { 
    phone: { is_enabled: Boolean, default: false },
    email: { is_enabled: Boolean, default: true }
  },
  
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team'}]
});

UserSchema
  .virtual('full_name')
  .get(function() {
    return (this.first_name != null && this.last_name != null) ?  `${this.first_name} ${this.last_name}` : this.email;
  });

UserSchema.statics.findByEmail = function(val, cb) {
  var regEx = new RegExp(`/^${val.trim()}$/i`)
  return this.findOne({ email: regEx }, cb);
}


module.export = mongoose.model('User', UserSchema);