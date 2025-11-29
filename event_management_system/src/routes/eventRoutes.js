const express = require('express');
const { createEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Allow Organizer and Attendee to create events
router.post('/', authMiddleware(['Organizer', 'Attendee']), createEvent);

module.exports = router;
