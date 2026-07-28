const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Public folder ko serve karna
app.use(express.static("public"));
app.use("/api", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("Connection Error:", err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("Server is Running...");
});

// Server Start
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
