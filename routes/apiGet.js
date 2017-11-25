var express = require('express');
var router = express.Router();
var teams;
router.post('/', function(req, res, next) {
  teams = req.body;
  console.log(req.body);
  res.send(req.body);
});
router.get('/', function(req, res){
  res.send(teams[0].nickname);
});
module.exports = router;
