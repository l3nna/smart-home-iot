\# Smart Home IoT System



\## Description

A full-stack IoT smart home system that allows real-time control of devices and monitoring of sensor data through a web dashboard.



It combines web development and embedded systems using multiple technologies:

\- JavaScript (frontend + backend)

\- Python (hardware control)

\- Raspberry Pi (GPIO integration)



\---



\## Features

\- Control LED ON/OFF from web

\-  Read sensor data (temperature, humidity)

\-  Real-time updates (WebSockets)

\-  Full-stack dashboard

\-  Automation system (planned)



\---



\## Tech Stack

\- Frontend: React  

\- Backend: Node.js (Express, Socket.io)  

\- Hardware: Python  

\- Device: Raspberry Pi  



\---



\## Architecture

Frontend → Backend → Python → Hardware



React sends requests → Node.js processes → Python controls GPIO → Raspberry Pi executes



\---



## Project Execution

This system is built using a modular architecture, where each component runs independently and communicates through APIs and real-time events.

###  System Layers

- **Frontend (React):** User interface dashboard
- **Backend (Node.js):** API + real-time communication (WebSockets)
- **Hardware Layer (Python):** Controls Raspberry Pi GPIO and sensors

---

### Running the Project

Each service must be started separately:

#### Backend (API Server)
```bash
cd backend
npm install
node server.js

#### Frontend (Dashboard)
```bash
cd frontend
npm install
npm start

#### Hardware Layer (Raspberry Pi / Simulation)
```bash
cd hardware
python main.py