const express = require('express');
const router = express.Router();
const db = require('../database'); // adjust path if needed

// GET all listings
router.get('/', (req, res) => {
    db.all('SELECT * FROM listings', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET a single listing by ID
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM listings WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Listing not found' });
        res.json(row);
    });
});

// CREATE a listing
router.post('/', (req, res) => {
    const { title, description, price } = req.body;
    db.run(
        'INSERT INTO listings (title, description, price) VALUES (?, ?, ?)',
        [title, description, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, description, price });
        }
    );
});

// UPDATE a listing
router.put('/:id', (req, res) => {
    const { title, description, price } = req.body;
    db.run(
        'UPDATE listings SET title = ?, description = ?, price = ? WHERE id = ?',
        [title, description, price, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
});

// DELETE a listing
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM listings WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;
