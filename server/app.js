const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2024;

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

server.listen(PORT, () => {
//   console.log(`Server Listening ${PORT} PORT ...`);

  io.on("connection", (socket) => {
    socket.emit("welcome_message", `Socket Listening ${PORT} PORT ...`);
    socket.on("NEW_BOOKMARK_EVENT", bookmark => {
        socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    })
  });
});
