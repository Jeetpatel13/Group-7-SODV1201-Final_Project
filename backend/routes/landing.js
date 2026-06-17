// AI (Gemini) was used to format the database query rows into a structured JSON array payload ready for frontend page rendering.

const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/properties
router.get("/properties", (req, res) => {
    // Uses standard db.all callback syntax matching Jeet's file layout style
    db.all("SELECT * FROM properties", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Returns rows as a JSON array payload for your landing interface cards
        res.json(rows);
    });
});

module.exports = router;
