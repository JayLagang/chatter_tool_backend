const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const aiRoutes = require('./routes/ai_routes');
const categoryRoutes = require('./routes/category_routes');
const modelRoutes = require('./routes/model_routes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/model', modelRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
