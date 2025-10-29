const FocusSession = require('../models/FocusSession');

// Create focus session log
const createSession = async (req, res) => {
  try {
    const { taskId, startTime, endTime, duration } = req.body;
    if (!taskId || !startTime || !endTime || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const session = await FocusSession.create({
      taskId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration: Number(duration),
      userId: req.user._id
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error('Create focus session error:', error);
    res.status(500).json({ success: false, message: 'Failed to save focus session' });
  }
};

// Get sessions for user
const getSessions = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const sessions = await FocusSession.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error('Get focus sessions error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch focus sessions' });
  }
};

module.exports = { createSession, getSessions };


