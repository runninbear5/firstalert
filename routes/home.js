var express = require('express');
var router = express.Router();

var controller = require('../controllers/homeController');

router.get('/', controller.home);
router.get('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/settings', controller.settings);

module.exports = router;
