var express = require('express');
var router = express.Router();

//gets controllers
var controller = require('../controllers/homeController');

router.get('/', controller.home);

router.get('/login', controller.login);

module.exports = router;
