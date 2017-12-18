var express = require('express');
var router = express.Router();

var controller = require('../controllers/authController');
var passport = controller.passport;
var GoogleStrategy = controller.googleStrategy;

router.get('/google/callback', controller.callback);

router.get('/google', controller.authenticate);

module.exports = router;
