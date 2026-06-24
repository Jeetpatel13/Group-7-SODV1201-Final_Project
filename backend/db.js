// Created db.js file that will create and connect the SQLite Database file to server and using 
// module.exports so that frontend can access this database.
// Also used the code given by the professor for in-class example.
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connect to SQLite Database");
    }
});

module.exports = db;


// Adding test data.

const testUsers = [
    [1, "John", "Owner", "owner@workspace.com", "password123", "4031234567", "owner"],
    [2, "Jane", "Coworker", "coworker@workspace.com", "password123", "4037654321", "coworker"]
];

const sql = `
        INSERT OR IGNORE INTO users (id, firstName, lastName, email, password, phone, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
