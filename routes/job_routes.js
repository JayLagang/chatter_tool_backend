const express = require('express');
const { Queue, Job } = require('bullmq');
const Redis = require('ioredis');

const router = express.Router();
const connection = new Redis();
const spoofQueue = new Queue('spoofQueue', { connection });

// @desc   Get job status
// @route  GET /api/jobs/:jobId/status
// @access Public
router.get('/:jobId/status', async (req, res) => {
    try {
        const job = await Job.fromId(spoofQueue, req.params.jobId);
        if (job) {
            const state = await job.getState();
            res.json({ status: state });
        } else {
            res.status(404).json({ error: 'Job not found' });
        }
    } catch (error) {
        console.error('Job status error:', error);
        res.status(500).json({ error: 'Failed to get job status' });
    }
});

// @desc   Get job result
// @route  GET /api/jobs/:jobId/result
// @access Public
router.get('/:jobId/result', async (req, res) => {
    try {
        const job = await Job.fromId(spoofQueue, req.params.jobId);
        if (job) {
            const state = await job.getState();
            if (state === 'completed') { 
                res.json(job.returnvalue);
            } else {
                res.status(400).json({ error: 'Job is not completed yet' });
            }
        } else {
            res.status(404).json({ error: 'Job not found' });
        }
    } catch (error) {
        console.error('Job result error:', error);
        res.status(500).json({ error: 'Failed to get job result' });
    }
});

// @desc   Get all jobs
// @route  GET /api/jobs
// @access Public
router.get('/', async (req, res) => {
    try {
        const jobs = await spoofQueue.getJobs(['completed', 'failed', 'delayed', 'active', 'waiting']);
       
        res.json(jobs);
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ error: 'Failed to get jobs' });
    }
});

module.exports = router;
