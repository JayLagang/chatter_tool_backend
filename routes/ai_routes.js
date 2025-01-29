const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai_controller');

router.post('/generate_flirty_response', aiController.getFlirtyHustlerResponse);

module.exports = router;
