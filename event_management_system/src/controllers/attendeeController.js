const Attendee = require('../models/Attendee');
const logger = require('../config/logger');

exports.registerAttendee = async (req, res, next) => {
  try {
    const attendee = await Attendee.create(req.body);
    logger.info(`Attendee registered for event: ${attendee.event}`);
    res.status(201).json({ success: true, data: attendee });
  } catch (error) {
    logger.error('Attendee registration failed', { error: error.message });
    next(error);
  }
};