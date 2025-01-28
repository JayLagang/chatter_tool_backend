const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const aiRoutes = require('./routes/ai_routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/ai', aiRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
