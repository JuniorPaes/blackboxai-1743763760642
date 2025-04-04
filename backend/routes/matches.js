const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { requireAuth } = require('../middleware/authMiddleware');

// Get user's matches
router.get('/', requireAuth, matchController.getUserMatches);

// Get specific match details
router.get('/:matchId', requireAuth, matchController.getMatchDetails);

module.exports = router;