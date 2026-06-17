// AI (Gemini) was used to generate the asynchronous bcrypt password salting and hashing structure for secure database registration.
// AI (Gemini) was used to design the stateless JWT token signing format and configure the '1h' expiration payload required for Phase 2 authentication.

const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "super_secret_key_12345";

// Creating Users Table (Matches Jeet's table initialization style)
db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone TEXT NOT NULL,
        role TEXT NOT NULL)`, function (err) {
    if (err) {
        console.log('Error creating users table:', err.message);
    } else {
        console.log('Users table ready!');
    }
});

// POST /register
router.post("/register", (req, res) => {
    const { firstName, lastName, email, password, phone, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !role) {
        return res.status(400).json({ error: "Please fill out all fields" });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            return res.status(400).json({ error: "User already exists with this email." });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ error: err.message });
            
            bcrypt.hash(password, salt, (err, hashedPassword) => {
                if (err) return res.status(500).json({ error: err.message });

                const query = `INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)`;
                db.run(query, [firstName, lastName, email, hashedPassword, phone, role], function (err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    return res.status(201).json({ message: "User registered successfully!" });
                });
            });
        });
    });
});

// POST /login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide both email and password" });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Login successful!", token });
        });
    });
});

module.exports = router;
