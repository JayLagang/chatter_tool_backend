const { Worker } = require('bullmq');
const Redis = require('ioredis');
const { generateSpoofedImages } = require('../controllers/spoofer_controller');

const connection = new Redis({
    maxRetriesPerRequest: null
});

const worker = new Worker('spoofQueue', async job => {
    console.log(`Processing job ${job.id}`);
    return await generateSpoofedImages(job);
}, { connection });

worker.on('completed', job => {
    console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});

// Add logging to confirm worker initialization
console.log('Worker initialized and listening for jobs');
