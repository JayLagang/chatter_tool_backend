const express = require('express');
const parseMiddleware = require('../middlewares/multer_middleware');
const { Queue } = require('bullmq');
const Redis = require('ioredis');

const router = express.Router();
const connection = new Redis();
const spoofQueue = new Queue('spoofQueue', { connection });

// @desc   Generate spoofed image
// @route  POST /api/spoofer/spoof-image
// @access Public
router.post('/spoof-image', parseMiddleware, async (req, res) => {
    try {
        const job = await spoofQueue.add('generateSpoofedImages', {
            files: req.files,
            body: req.body
        });
        res.json({ jobId: job.id });
    } catch (error) {
        console.error('Queueing error:', error);
        res.status(500).json({ error: 'Failed to queue the job' });
    }
});

module.exports = router;
