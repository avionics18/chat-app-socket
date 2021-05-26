const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");


const server = http.createServer(app);

// io object handles all the sockets inside the server
const io = socketio(server);


// routes
app.use("/", express.static(path.join(__dirname, "public")));


const users = {};

io.on("connection", (socket) => {

    socket.on("logged_in", (data) => {
        users[socket.id] = data.name;
    });


    socket.on("send_msg", (data) => {
        io.emit("got_msg", {
            msg: data.msg,
            id: socket.id,
            name: users[socket.id]
        });
    });
});


// server
server.listen(process.env.PORT || 3001, () => {
    console.log("Server running successfully!");
});
