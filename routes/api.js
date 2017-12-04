var express = require('express');
var router = express.Router();

//gets controllers
var notification_controller = require('../controllers/api/notificationController');

router.post('/tba-notify', notification_controller.tbaNotify);

module.exports = router;
