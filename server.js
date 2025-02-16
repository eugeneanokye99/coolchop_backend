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
const https = require('https'); 
const { exec } = require('child_process'); 
require('dotenv').config();
const path = require('path');
const fs = require('fs');




const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

// Create HTTP server and attach to Socket.IO
const server = https.createServer(options, app);
const socketServer = new Server(server);

// WebSocket events
socketServer.on("connection", (socket) => {
  console.log("WebSocket connection successful");
  socket.on("disconnect", () => {
    console.log("WebSocket connection disconnected");
  });
});


app.use('/public', express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{
res.send("hello express")
})

// API Routes
app.use('/api/user', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/upload", uploadsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/reviews", reviewRoutes);


// Webhook Route for CI/CD
app.post('/webhook', (req, res) => {
  const payload = req.body;
  res.status(200).send('Webhook received');

  // Check if the event is a GitHub push event
  if (req.headers['x-github-event'] === 'push' || req.headers['x-github-event'] === 'ping') {
    console.log('Webhook triggered by push event');

    // Run deployment commands
    exec('cd /home/ubuntu/coolchop_backend && git pull && npm install && pm2 restart server', (err, stdout, stderr) => {
      if (err) {
        console.error('Deployment failed:', stderr);
        return res.status(500).send('Deployment failed');
      }

      console.log('Deployment successful:', stdout);
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

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
