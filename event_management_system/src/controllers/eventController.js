const Event = require('../models/Event');
const fs = require('fs');
const path = require('path');
const logger = require('../config/logger');

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, organizer: req.user.id });
    logger.info(`Event created: ${event.title}`);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    logger.error('Event creation failed', { error: error.message });
    next(error);
  }
};

// controllers/eventController.js
exports.uploadImage = (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No image uploaded');
  }

  const image = req.files.image;
  const uploadPath = __dirname + '/../uploads/' + image.name;

  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Image uploaded successfully');
  });
};