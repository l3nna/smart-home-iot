import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [temp, setTemp] = useState("Loading...");
  const [led, setLed] = useState(false);

  useEffect(() => {
    socket.on("temp-update", (data) => {
      setTemp(data);
    });

    socket.on("led-update", (state) => {
      setLed(state === "true");
    });
  }, []);

  const toggleLED = () => {
    const newState = !led;
    socket.emit("led", newState.toString());
    setLed(newState);
  };

  return (
    <div className="app">
      <h1 className="title">🏠 Smart Home Dashboard</h1>

      <div className="grid">

        {/* TEMPERATURE CARD */}
        <div className="card">
          <h2>🌡 Temperature</h2>
          <p className="value">{temp} °C</p>
        </div>

        {/* LED CARD */}
        <div className="card">
          <h2>💡 Light Control</h2>
          <p className="status">
            Status: {led ? "ON" : "OFF"}
          </p>

          <button onClick={toggleLED} className="btn">
            Toggle LED
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;