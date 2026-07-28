const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");

const app = express();


// Create HTTP Server
const server = http.createServer(app);


// Socket.IO Setup
const io = new Server(server, {

    cors: {
        origin: "*"
    }

});


// Store online registered users
let onlineUsers = [];


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Public Folder
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use("/api", userRoutes);



// Socket Connection

io.on("connection", (socket) => {


    console.log("Socket Connected:", socket.id);



    // Send existing users to newly connected client

    socket.emit("liveUsers", {

        count: onlineUsers.length,

        users: onlineUsers

    });





    // Receive registered user details

    socket.on("userDetails", (userData) => {


        console.log("User Details Received:", userData);



        // Remove duplicate socket entry

        onlineUsers = onlineUsers.filter(

            (user) => user.id !== socket.id

        );



        // Add registered user

        onlineUsers.push({

            id: socket.id,

            name: userData.name,

            email: userData.email

        });



        // Broadcast updated list

        io.emit("liveUsers", {


            count: onlineUsers.length,


            users: onlineUsers


        });



    });





    // Disconnect

    socket.on("disconnect", () => {


        console.log("Socket Disconnected:", socket.id);



        onlineUsers = onlineUsers.filter(

            (user) => user.id !== socket.id

        );



        io.emit("liveUsers", {


            count: onlineUsers.length,


            users: onlineUsers


        });



    });



});




// MongoDB Connection

mongoose.connect("process.env.MONGODB_URI")

.then(() => {

    console.log("MongoDB Connected Successfully");

})

.catch((err) => {

    console.log("Connection Error:", err);

});




// Home Route

app.get("/", (req, res) => {


    res.sendFile(

        path.join(__dirname, "public", "index.html")

    );


});




// Server Start

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {


    console.log(`Server running on http://localhost:${PORT}`);


});