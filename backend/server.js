const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { runPython } = require("./services/pythonService");

const app = express();
const server = http.createServer(app);

// CORS setup (VERY IMPORTANT for React frontend)
app.use(cors());
app.use(express.json());

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // React frontend
    methods: ["GET", "POST"]
  }
});

// Test route (so browser "/" works)
app.get("/", (req, res) => {
  res.send("Smart Home Backend is running 🚀");
});

// =======================
// SOCKET CONNECTION
// =======================
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  // 📡 FRONTEND REQUEST: GET TEMPERATURE
  socket.on("get-temp", async () => {
    try {
      const temp = await runPython("temp");
      socket.emit("temp-update", temp);
    } catch (err) {
      console.error("Temp error:", err);
    }
  });

  // 💡 FRONTEND REQUEST: TOGGLE LED
  socket.on("led", async (state) => {
    try {
      await runPython(`led ${state}`);
      socket.emit("led-update", state);
    } catch (err) {
      console.error("LED error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

// =======================
// START SERVER
// =======================
server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});