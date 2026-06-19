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
