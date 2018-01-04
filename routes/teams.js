var express = require('express');
var router = express.Router();

var controller = require('../controllers/teamController');

router.get('/', controller.teams);
router.get('/unsubscribe', controller.unsubscribe);
router.get('/teamSearch', controller.teamSearch);
router.get('/subscribe', controller.subscribe);

module.exports = router;
