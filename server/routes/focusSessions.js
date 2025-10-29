const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const { createSession, getSessions } = require('../controllers/focusSessionController');

const router = express.Router();

router.use(authenticateToken);

router.post('/', createSession);
router.get('/', getSessions);

module.exports = router;


