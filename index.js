const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/db');
require('dotenv').config();

const app = express();

// Enable CORS before any route definitions
app.use(cors({
    origin: ['http://localhost:5500', 'https://your-frontend-url.vercel.app'],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
