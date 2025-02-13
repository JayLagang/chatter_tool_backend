const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const aiRoutes = require('./routes/ai_routes');
const categoryRoutes = require('./routes/category_routes');
const modelRoutes = require('./routes/model_routes');
const conversationRoutes = require('./routes/conversation_routes');
const spooferRoutes = require('./routes/spoofer_routes');
const jobRoutes = require('./routes/job_routes'); // New route for job status
const { Queue } = require('bullmq');
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
app.use(morgan('dev'));

// Redis connection
const connection = new Redis({
    maxRetriesPerRequest: null
});

// BullMQ queue
const spoofQueue = new Queue('spoofQueue', { connection });

// Import worker to initialize it
require('./workers/spoofer_worker');

// Set request timeout to 10 minutes (600000 milliseconds)
app.use((req, res, next) => {
    if (req.url === '/api/spoofer/spoof-image') {
        req.setTimeout(600000); // 10 minutes
    }
    next();
});

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/model', modelRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/spoofer', spooferRoutes);
app.use('/api/jobs', jobRoutes); // New route for job status

const PORT = process.env.PORT;

// console.log the memory usage every 10 seconds
setInterval(() => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory usage: ${Math.round(used * 100) / 100} MB`);
}, 10000);

// console.log the number of jobs in the queue and the memory usage of that process every 10 seconds
setInterval(async () => {
    const jobs = await spoofQueue.getJobCounts();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Jobs in queue:`, jobs);
    console.log(`Memory usage: ${Math.round(used * 100) / 100} MB`);
}, 10000);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
