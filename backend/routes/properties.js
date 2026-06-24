// Took help from the code provided by the professor for in-class example.
// Took help from W3Schools "https://www.w3schools.com/nodejs/nodejs_express.asp" to understand and use
// "const router = express.Router();" and other functions as well.
// express.Router(); helps to route the individual js functions file to the server.

const express = require("express");
const router = express.Router();
const db = require("../db");

// Creating Properties Table.
db.run(`CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ownerId INTEGER NOT NULL,
        address TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        squareFeet INTEGER NOT NULL,
        parking TEXT NOT NULL,
        pTransit TEXT NOT NULL)` , function (err) {
    if (err) {
        console.log('Error creating table:', err.message);
    } else {
        console.log('Properties table ready!');
    }
});

// Geting all the properties that belongs to the particular owner.
router.get("/", (req, res) => {

    const ownerId = req.query.ownerId;

    if (ownerId) {

        db.all(
            "SELECT * FROM properties WHERE ownerId = ?",
            [ownerId],
            (err, rows) => {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json(rows);
            }
        );

    } else {

        db.all(
            "SELECT * FROM properties",
            [],
            (err, rows) => {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json(rows);
            }
        );
    }
});

// Posting all the new properties to the database.
router.post("/", (req, res) => {
    const { ownerId, address, neighborhood, squareFeet, parking, pTransit } = req.body;

    db.run(`
        INSERT INTO properties 
        (ownerId, address, neighborhood, squareFeet, parking, pTransit)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [ownerId, address, neighborhood, squareFeet, parking, pTransit],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json({
                message: "Property added successfully",
                id: this.lastID
            });
        }
    );
});

// Edit the property
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { address, neighborhood, squareFeet, parking, pTransit } = req.body;

    db.run(`UPDATE properties 
        SET address=?, neighborhood=?, squareFeet=?, parking=?, pTransit=?
        WHERE id=?`,
        [address, neighborhood, squareFeet, parking, pTransit, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json({
                message: "Property updated successfully"
            });
        }
    );
});


// Delete the property according to the id.
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM properties WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        res.json({
            message: "Property deleted successfully"
        });
    });
});

module.exports = router;