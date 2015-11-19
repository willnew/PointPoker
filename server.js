// import libs
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('serverIp', 'localhost');
app.set('port', 10086);
app.use('/', express.static(path.join(__dirname, 'web')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// variables
var POINTS = path.join(__dirname, 'data.json');

// API to write points to JSON file
app.get('/points', function(req, res) {
  fs.readFile(POINTS, function(err, data) {
    if (err) {
      console.error("...error...");
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

// API to read points from JSON file
app.post('/points', function(req, res) {
});


// broadcast server IP
app.listen(app.get('port'), function() {
  console.log("You can broadcast this message to team members:\n");
  console.log("http://" + app.get('serverIp') + app.get('port'));
});
