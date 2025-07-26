const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Aktifkan CORS untuk semua origin (atau batasi kalau mau)
app.use(cors({
  origin: "*", // Ganti ini jika mau dibatasi ke domain tertentu
  methods: ["GET", "POST"]
}));

// Socket.IO instance dengan CORS juga!
const io = new Server(server, {
  cors: {
    origin: "*", // HARUS ada ini!
    methods: ["GET", "POST"]
  }
});

// Route testing
app.get("/", (req, res) => {
  res.send("Socket.IO backend aktif!");
});

// Handle socket event
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
