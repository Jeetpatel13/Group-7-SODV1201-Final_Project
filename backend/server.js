// Took help from W3School to use "cors()"
// Using "cors()" to allow frontend to make request to backend while on different PORT
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// All group members add your routes and app.use() of your respected pages.
const propertyRoutes = require("./routes/properties");
app.use("/properties", propertyRoutes);


app.get("/", (req, res) => {
    res.send("Shared Workspace API Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});