const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

const initialLoad = require('./cpu_load')();

/* Included for CORS issue */
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
});

//console.log(initialLoad());

// Redirect all non api requests to index file in build folder
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// start our server
/*const server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});*/
const server = http.createServer(app);

//include socket for real time data transfer
const io = socketIo(server);

io.on("connection", socket => {
   console.log("inside io"); 
  console.log("New client connected"), setInterval(
    () => {
    	calcLoad(socket);
    },
    2000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

/* Calculate the cpu load async */
const calcLoad = async socket => {
  try {
        let endLoad = require('./cpu_load')();
    	let idleDifference = endLoad.idle - initialLoad.idle;
        let totalDifference = endLoad.total - initialLoad.total;
        let cpuLoad = 100 - ~~(100 * idleDifference / totalDifference);
        console.log("**Percentage of CPU Load**"+cpuLoad);
    
    socket.emit("FromAPI", cpuLoad);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));


