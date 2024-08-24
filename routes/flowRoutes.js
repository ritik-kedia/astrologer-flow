const express = require('express');
const router = express.Router();
const AstrologerController = require('../controllers/flowController');


router.post('/assignUser', AstrologerController.assignUser);

router.post('/adjustFlow', AstrologerController.adjustFlow);

module.exports = router;
