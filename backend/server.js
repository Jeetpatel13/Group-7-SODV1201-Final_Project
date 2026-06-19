// Took help from W3School to use "cors()"
// Using "cors()" to allow frontend to make request to backend while on different PORT
// Also used the code given by the professor for in-class example.
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// All group members add your routes and app.use() of your respected pages.
const propertyRoutes = require("./routes/properties");
app.use("/properties", propertyRoutes);

const registerRoutes = require("./routes/register");
const landingRoutes = require("./routes/landing");

const workspaceRoutes = require("./routes/addWorkspaces");
app.use("/workspaces", workspaceRoutes);

app.use("/api", registerRoutes); // Directs to POST /api/register and POST /api/login endpoints
app.use("/api", landingRoutes);  // Directs to GET /api/properties data loop handler

const listingsRouter = require('./routes/listings');
app.use('/listings', listingsRouter);

app.get("/", (req, res) => {
    res.send("Shared Workspace API Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
