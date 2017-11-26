var express = require('express');
var router = express.Router();
var teams;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://tes:test@ds121456.mlab.com:21456/lieberlerts');

//create a schema- this is like a blueprint for data
var teamSchema = new mongoose.Schema({
  city: String,
  country: String,
  key: String,
  name: String,
  nickname: String,
  state_prov: String,
  team_number: int
});
var Teams = mongoose.model('Teams', teamSchema);

router.post('/', function(req, res, next) {
  teams = req.body;
  console.log(req.body);

  for(int i=0; i<500; i++){
    var newTeams = Todo(req.body[i]).save(function(err,data){
      if(err) throw err;
    //  res.json(data);
    });
  }
  res.send(req.body);
});
router.get('/', function(req, res){
  res.send(teams);
});
module.exports = router;
