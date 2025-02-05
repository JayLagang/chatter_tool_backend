const express = require('express');

const parseMiddleware = require('../middlewares/multer_middleware');
const spooferController = require('../controllers/spoofer_controller');

const router = express.Router();



// @desc   Generate spoofed image
// @route  POST /api/spoofer/spoof-image
// @access Public
router.post('/spoof-image', parseMiddleware, spooferController.generateSpoofedImages);

module.exports = router;
