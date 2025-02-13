const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const aiRoutes = require('./routes/ai_routes');
const categoryRoutes = require('./routes/category_routes');
const modelRoutes = require('./routes/model_routes');
const conversationRoutes = require('./routes/conversation_routes');
const spooferRoutes = require('./routes/spoofer_routes');
const jobRoutes = require('./routes/job_routes'); // New route for job status
const { Queue, Worker } = require('bullmq');
const Redis = require('ioredis');
const app = express();

// Middleware
app.use(cors(
    {
        origin: ['http://localhost:3000','https://acnd.cloud'],
        credentials: true
    }
));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev')); // Use verbose logging only in development
} else {
    app.use(morgan('tiny')); // Use less verbose logging in production
}

// Redis connection
const connection = new Redis({
    maxRetriesPerRequest: null
});

// BullMQ queue
const spoofQueue = new Queue('spoofQueue', { connection });

// Worker to process jobs
const worker = new Worker('spoofQueue', async job => {
    // Process job here
}, { connection });

// Import worker to initialize it
require('./workers/spoofer_worker');

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/spoofer', spooferRoutes);
app.use('/api/jobs', jobRoutes); // New route for job status

const PORT = process.env.PORT || 8000; // Default to port 8000 if not specified

// Health check
app.get('/health', (req, res) => {
    res.send({ message: 'Server is running', jobs: 'Jobs in queue: ' + spoofQueue.getJobCounts(), memoryUsage: 'Memory usage: ' + process.memoryUsage().heapUsed / 1024 / 1024 + ' MB' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
