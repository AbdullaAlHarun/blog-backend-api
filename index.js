const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
