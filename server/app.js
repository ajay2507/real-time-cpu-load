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

const initialLoad = require('./cpu_load');



console.log(initialLoad());

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
    1000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


const calcLoad = async socket => {
  try {
        let endLoad = initialLoad();
    	let idleDifference = endLoad.idle - initialLoad.idle;
        let totalDifference = endLoad.total - initialLoad.total;
        let cpuLoad = 100 - ~~(100 * idleDifference / totalDifference);
        console.log("**Percentage**"+cpuLoad);
    
    socket.emit("FromAPI", cpuLoad);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));


