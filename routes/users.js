const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Add new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide name and email' });
    }
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'User added successfully' });
        }
    });
});

// Get all posts by a specific user (JOIN example)
router.get('/:id/posts', (req, res) => {
    const userId = req.params.id;
    const query = `
        SELECT users.name, posts.title, posts.content 
        FROM users 
        JOIN posts ON users.id = posts.user_id 
        WHERE users.id = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update user by ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Please provide name and email' });
    }

    db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, userId],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'User updated successfully' });
            }
        }
    );
});

// Delete user by ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    });
});

module.exports = router;
