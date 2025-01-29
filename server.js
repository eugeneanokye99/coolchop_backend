const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require("./routes/ordersRouter");
const uploadsRoutes = require("./routes/uploadRoutes");
const cartRoutes = require("./routes/cartRoutes");
const ratingsRoutes = require("./routes/ratingsRoute");
const reviewRoutes = require("./routes/reviewRoute");
const { Server } = require("socket.io");
const cors = require('cors');
const http = require('http'); 
require('dotenv').config();
const path = require('path');



const app = express();

app.use(cors({origin: "*"}));
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
app.use('/api/orders', orderRoutes);
app.use("/api/upload", uploadsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/reviews", reviewRoutes);


// Sync database  
sequelize.sync().then(() => {
  console.log('Database synced');    
}).catch(err => {
  console.error('Unable to sync database:', err);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
