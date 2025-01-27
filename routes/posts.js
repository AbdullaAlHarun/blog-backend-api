const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Adjust this path as per your project structure
const authenticateToken = require('../middleware/authMiddleware');

// Get all posts
router.get('/', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM posts';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.json(results);
    });
});

// Create a new post
router.post('/', authenticateToken, (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const userId = req.user.id; // Assuming the user ID is attached to the request after token verification
    const query = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';

    db.query(query, [title, content, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Post created successfully' });
    });
});

module.exports = router;
