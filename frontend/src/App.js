import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [temp, setTemp] = useState("No data");
  const [led, setLed] = useState(false);

  useEffect(() => {
    socket.on("temp-update", (data) => {
      setTemp(data);
    });

    socket.on("led-update", (state) => {
      setLed(state === "true");
    });
  }, []);

  const getTemp = () => {
    socket.emit("get-temp");
  };

  const toggleLED = () => {
    const newState = !led;
    socket.emit("led", newState.toString());
    setLed(newState);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🏠 Smart Home Dashboard</h1>

      <h2>🌡 Temperature: {temp}</h2>

      <button onClick={getTemp}>
        Get Temperature
      </button>

      <hr />

      <h2>💡 LED: {led ? "ON" : "OFF"}</h2>

      <button onClick={toggleLED}>
        Toggle LED
      </button>
    </div>
  );
}

export default App;