const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { runPython } = require("./services/pythonService");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Home Backend is running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("get-temp", async () => {
    const temp = await runPython("temp");
    socket.emit("temp-update", temp);
  });

  socket.on("led", async (state) => {
    await runPython(`led ${state}`);
    socket.emit("led-update", state);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});