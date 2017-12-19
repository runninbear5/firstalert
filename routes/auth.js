var express = require('express');
var router = express.Router();

<<<<<<< HEAD
var controller = require('../controllers/authController1');
=======
var controller = require('../controllers/authController');
>>>>>>> 078250b52aab1e1c475704994181e7e10a18f73b

router.get('/google', controller.authenticate);

router.get('/google/callback', controller.callback);

module.exports = router;
