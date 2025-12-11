const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

router.get('/login', userController.renderLoginPage);
router.post('/send-magic-link', userController.sendMagicLink);
router.post('/auth/magic-link', userController.testMagicLink);

module.exports = router;