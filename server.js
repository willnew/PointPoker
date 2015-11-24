'use strict';

// import libs
var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var httpServer = require('http').Server(app);
var wss = new (require('ws').Server)({ server: httpServer });

app.set('serverIp', 'localhost');
app.set('port', 10086);
app.use('/', express.static(path.join(__dirname, 'web')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat'
}));

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

app.post('/rest/login', function(req, res) {
  var sess = req.session;
  console.log(req.sessionID);
  sess.userName = req.body.name;
  res.json({name: req.body.name});
});

// Websocket
wss.on('connection', function(ws) {
  console.log(ws.upgradeReq);
});

// broadcast server IP
httpServer.listen(app.get('port'), function() {
  console.log("You can broadcast this message to team members:\n");
  console.log("http://" + app.get('serverIp') + app.get('port'));
});
