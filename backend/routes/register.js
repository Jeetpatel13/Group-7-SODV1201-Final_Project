//  AI (Gemini) was used to generate the asynchronous bcrypt password salting and hashing structure for secure database registration.
//  AI (Gemini) was used to design the stateless JWT token signing format and configure the '1h' expiration payload required for Phase 2 authentication.

const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'super_secret_key_12345';

// POST /api/register
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "Please fill out all fields" });
    }
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query('INSERT INTO users (fullName, password, email) VALUES (?, ?, ?)', [fullName, hashedPassword, email]);
        return res.status(201).json({ message: "User registered successfully inside the database!" });
    } catch (err) {
        return res.status(500).json({ error: "Database error during registration." });
    }
});

// POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, users[0].password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: users[0].id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        return res.status(500).json({ error: "Database error during login." });
    }
});

module.exports = router;
