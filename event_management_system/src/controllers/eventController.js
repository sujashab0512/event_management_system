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
exports.uploadImage = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Save raw binary data from request body
    const fileName = `event_${Date.now()}.jpg`;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    const writeStream = fs.createWriteStream(filePath);
    req.pipe(writeStream);

    writeStream.on('finish', async () => {
      event.image = fileName;
      await event.save();

      res.json({
        success: true,
        message: 'Event image uploaded successfully',
        data: {
          fileName,
          filePath: `/uploads/${fileName}`,
          uploadedAt: new Date()
        }
      });
    });

    writeStream.on('error', (err) => {
      res.status(500).json({ success: false, message: err.message });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};