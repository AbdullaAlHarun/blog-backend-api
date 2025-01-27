const express = require('express');
const router = express.Router();
const db = require('../models/db');
const authenticateToken = require('../middleware/authMiddleware');

// Protected route to get all posts
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Get all posts
router.get('/', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Add new post
router.post('/', authenticateToken, (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    const query = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
    db.query(query, [title, content, req.user.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Post created successfully' });
    });
});

module.exports = router;
