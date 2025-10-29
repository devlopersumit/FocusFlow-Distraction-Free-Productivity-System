const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getInsights } = require('../controllers/insightsController');

// GET /api/insights
router.get('/', authenticateToken, getInsights);

module.exports = router;


