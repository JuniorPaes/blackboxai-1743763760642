const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

// Get current user profile
router.get('/me', requireAuth, userController.getCurrentUser);

// Get users for swiping (filtered by distance/interests)
router.get('/', requireAuth, userController.getUsersForSwiping);

// Update user profile
router.put('/', requireAuth, userController.updateProfile);

module.exports = router;