const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Redirect all non api requests to index file in build folder
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
// start our server
const server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});


