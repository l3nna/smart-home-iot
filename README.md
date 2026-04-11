Smart Home IoT System
Description

A full-stack IoT smart home system that enables real-time control of devices and monitoring of sensor data through a web dashboard.

The system combines web development and embedded systems using multiple technologies:

JavaScript (frontend and backend)
Python (hardware control)
Raspberry Pi (GPIO integration)
Features
Control LED ON/OFF from a web interface
Read sensor data (temperature, humidity)
Real-time updates using WebSockets
Full-stack dashboard
Automation system (planned)
Tech Stack
Frontend: React
Backend: Node.js (Express, Socket.io)
Hardware: Python
Device: Raspberry Pi
Architecture

Frontend → Backend → Python → Hardware

React sends requests to the Node.js backend, which processes the data and communicates with the Python hardware layer. Python controls GPIO on the Raspberry Pi to execute physical device actions.

Project Execution

This system is built using a modular architecture where each component runs independently and communicates through APIs and real-time events.

System Layers
Frontend (React): User interface for device control and monitoring
Backend (Node.js): API layer and WebSocket server for real-time communication
Hardware Layer (Python): Handles GPIO control and sensor data processing on Raspberry Pi
