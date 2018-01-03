var express = require('express');
var router = express.Router();

var controller = require('../controllers/adminController');

router.get('/populate-teams', controller.populateTeams);

module.exports = router;
