// AI (Gemini) was used to format the database query rows into a structured JSON array payload ready for frontend page rendering.

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/properties
router.get('/properties', async (req, res) => {
    try {
        const [properties] = await db.query('SELECT * FROM properties');
        return res.status(200).json(properties);
    } catch (err) {
        return res.status(500).json({ error: "Database error while fetching properties." });
    }
});

module.exports = router;
