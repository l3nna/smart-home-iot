const express = require("express");
const app = express();

const { runPython } = require("./services/pythonService");

app.use(express.json());

app.get("/test-temp", async (req, res) => {
  const temp = await runPython("temp");
  res.json({ temperature: temp });
});

app.get("/test-led-on", async (req, res) => {
  await runPython("led true");
  res.send("LED ON triggered");
});

app.get("/test-led-off", async (req, res) => {
  await runPython("led false");
  res.send("LED OFF triggered");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});