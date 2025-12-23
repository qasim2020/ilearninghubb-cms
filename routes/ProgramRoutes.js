const express = require('express');
const router = express.Router();
const requireLogin = require('../modules/authenticate');
const programController = require('../controllers/programController');

router.get("/programs", requireLogin, programController.programs);

module.exports = router;