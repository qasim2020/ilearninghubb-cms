const express = require('express');
const router = express.Router();
const requireLogin = require('../modules/authenticate');
const eventController = require('../controllers/eventController');

router.get("/events", requireLogin, eventController.events);

module.exports = router;