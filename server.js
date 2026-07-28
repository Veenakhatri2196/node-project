const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("Connection Error:", err);
});

// Default Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});