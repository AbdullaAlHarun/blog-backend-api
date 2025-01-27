const express = require('express');
const router = express.Router();
const db = require('../models/db');

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
router.post('/', (req, res) => {
    const { title, content, user_id } = req.body;
    if (!title || !content || !user_id) {
        return res.status(400).json({ message: 'Please provide title, content, and user_id' });
    }
    db.query('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)', [title, content, user_id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Post added successfully' });
        }
    });
});

module.exports = router;
