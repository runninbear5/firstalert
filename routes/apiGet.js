var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test@ds121456.mlab.com:21456/lieberlerts',{
  useMongoClient: true
});

//create a schema- this is like a blueprint for data
var teamSchema = new mongoose.Schema({
  _id: String,
  city: String,
  country: String,
  key: String,
  name: String,
  nickname: String,
  state_prov: String,
  team_number: String
});
var Teams = mongoose.model('Teams', teamSchema);
router.post('/', function(req, res, next) {
  // Teams.find({_id: "frc120"}, function(err, data){
  //   console.log(data[0]._id);
  // });
  var count = Object.keys(req.body).length;
  var i = 0;
  while(i<count){
    var team = new Teams({
      _id: req.body[i].key,
      city: req.body[i].city,
      country: req.body[i].country,
      key: req.body[i].key,
      name: req.body[i].name,
      nickname: req.body[i].nickname,
      state_prov: req.body[i].state_prov,
      team_number: req.body[i].team_number
    });
      Teams.find({_id: req.body[i].key}).remove(function(err, data){
        if(err) throw err;
      });
      team.save(function(err){
        if(err) throw err;
      });
      i++;
    }
  res.send("good");
});
router.get('/', function(req, res){
  Teams.find({_id: "frc121"}, function(err, data){
    if(err) throw err;
    res.send(data[0].nickname);
  });
});
module.exports = router;
