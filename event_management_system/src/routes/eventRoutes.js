const express = require('express');
const { createEvent, uploadImage } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware(['Organizer']), createEvent);

// no multer here, just call uploadImage
router.post('/:id/image', authMiddleware(['Organizer']), uploadImage);

module.exports = router;
