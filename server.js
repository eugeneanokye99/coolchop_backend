const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require("./routes/ordersRouter");
const uploadsRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { Server } = require("socket.io");
const cors = require('cors');
const http = require('http');  // Import http module to attach WebSocket
require('dotenv').config();
const path = require('path');



const app = express();

app.use(cors());
app.use(express.json());

// Create HTTP server and attach to Socket.IO
const server = http.createServer(app);
const socketServer = new Server(server);

// WebSocket events
socketServer.on("connection", () => {
  console.log("WebSocket connection successful");
});
socketServer.on("disconnect", () => {
  console.log("WebSocket connection disconnected");
});

app.use('/public', express.static(path.join(__dirname, 'public')));


// API Routes
app.use('/api/user', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/order', orderRoutes);
app.use("/api/upload", uploadsRoutes);
app.use("/api/cart", cartRoutes);

// Sync database  
sequelize.sync().then(() => {
  console.log('Database synced');    
}).catch(err => {
  console.error('Unable to sync database:', err);
});

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://192.168.68.9:8082'; 

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
