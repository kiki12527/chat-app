const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// GANTI "http://localhost:3000" DENGAN IP/DOMAIN FRONTEND-MU
const io = new Server(server, {
  cors: {
    origin: "*",            // atau "http://18.140.184.137" kalau mau spesifik
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// (Opsional) untuk serving file statis
app.get("/", (req, res) => {
  res.send("Socket.IO backend is running!");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
