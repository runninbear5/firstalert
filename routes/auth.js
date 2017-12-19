var express = require('express');
var router = express.Router();

var controller = require('../controllers/authController1');

router.get('/google', controller.authenticate);

router.get('/google/callback', controller.callback);

module.exports = router;
