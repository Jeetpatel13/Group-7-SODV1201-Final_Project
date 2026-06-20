const express = require("express");
const router = express.Router();
const db = require("../db");

db.run(`
    CREATE TABLE IF NOT EXISTS workspaces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        propertyId INTEGER NOT NULL,
        type TEXT NOT NULL,
        seating INTEGER NOT NULL,
        smokingAllowed TEXT NOT NULL,
        availabilityDate TEXT NOT NULL,
        leaseTerm TEXT NOT NULL,
        price REAL NOT NULL
    )
`, function (err) {
    if (err) {
        console.log("Error creating workspaces table:", err.message);
    } else {
        console.log("Workspaces table ready!");
    }
});

// Get all workspaces
router.get("/", (req, res) => {

    db.all("SELECT * FROM workspaces", (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// Get single workspace by id
router.get("/:id", (req, res) => {

    const id = req.params.id;

    db.get(
        "SELECT * FROM workspaces WHERE id = ?",
        [id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: "Workspace not found"
                });
            }

            res.json(row);
        }
    );
});

// Add workspace
router.post("/", (req, res) => {

    const {
        propertyId,
        type,
        seating,
        smokingAllowed,
        availabilityDate,
        leaseTerm,
        price
    } = req.body;

    db.run(
        `INSERT INTO workspaces
        (propertyId, type, seating, smokingAllowed, availabilityDate, leaseTerm, price)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            propertyId,
            type,
            seating,
            smokingAllowed,
            availabilityDate,
            leaseTerm,
            price
        ],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Workspace added successfully",
                id: this.lastID
            });
        }
    );
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { propertyId,
        type,
        seating,
        smokingAllowed,
        availabilityDate,
        leaseTerm,
        price } = req.body;

    db.run(`UPDATE workspaces 
        SET propertyId=?, type=?, seating=?, smokingAllowed=?, availabilityDate=?,leaseTerm=?,price=?
        WHERE id=?`,
        [propertyId, type, seating, smokingAllowed, availabilityDate,leaseTerm,price, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            res.json({
                message: "Workspace updated successfully"
            });
        }
    );
});

// Delete workspace
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM workspaces WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Workspace deleted successfully"
            });
        }
    );
});

module.exports = router;
