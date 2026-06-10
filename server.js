const express = require('express');
const app = express();
const PORT = 3000;

// Allows the server to read incoming JSON data from frontend fetch requests
app.use(express.json());

// Serves all files directly from the main project root folder
app.use(express.static(__dirname));

// PHASE 1 LOCAL DATABASE (In-memory storage arrays)
let users = [];
let properties = [];
let workspaces = [];

// ==========================================
// 📝 1. REGISTRATION ROUTE
// ==========================================
app.post('/api/register', (req, res) => {
    const newUser = req.body;
    
    // Safety check to ensure data exists
    if (!newUser.email) {
        return res.status(400).json({ success: false, message: "Registration failed. Missing email." });
    }

    users.push(newUser);
    console.log("--- Current Users Array Matrix ---", users);
    
    res.json({ success: true, message: "User successfully saved to backend array!" });
});

// ==========================================
// 🔑 2. LOGIN ROUTE (For Phase 1 validation)
// ==========================================
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    
    // Look for the user in our local array
    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userExists) {
        res.json({ success: true, message: "Login successful!", user: userExists });
    } else {
        res.status(401).json({ success: false, message: "User not found. Please register first." });
    }
});

// ==========================================
// 🏠 3. PROPERTIES ROUTES
// ==========================================
app.post('/api/properties', (req, res) => {
    properties.push(req.body);
    console.log("--- Current Properties Array ---", properties);
    res.json({ success: true, message: "Property added to local database!" });
});

app.get('/api/properties', (req, res) => {
    res.json(properties);
});

// ==========================================
// 💼 4. WORKSPACES ROUTES
// ==========================================
app.post('/api/workspaces', (req, res) => {
    workspaces.push(req.body);
    console.log("--- Current Workspaces Array ---", workspaces);
    res.json({ success: true, message: "Workspace added to local database!" });
});

app.get('/api/workspaces', (req, res) => {
    res.json(workspaces);
});

// Start the network application engine
app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`🚀 Server running smoothly at http://localhost:${PORT}`);
    console.log(`📝 To test registration, go to: http://localhost:${PORT}/pages/register.html`);
    console.log(`================================================================`);
});
