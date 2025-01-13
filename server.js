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
const http = require('http'); 
const { exec } = require('child_process'); 
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


// Webhook Route for CI/CD
app.post('/webhook', (req, res) => {
  const payload = req.body;

  // Check if the event is a GitHub push event
  if (req.headers['x-github-event'] === 'push') {
    console.log('Webhook triggered by push event');

    // Run deployment commands
    exec('cd ./coolchop_backend && git pull && npm install && pm2 restart server', (err, stdout, stderr) => {
      if (err) {
        console.error('Deployment failed:', stderr);
        return res.status(500).send('Deployment failed');
      }

      console.log('Deployment successful:', stdout);
      res.status(200).send('Deployment successful');
    });
  } else {
    res.status(400).send('Event not handled');
  }
});


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
