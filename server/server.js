// Babel require hook for react-preset, enables server to transpile React JSX
require('babel-register')({
  presets: ['es2015', 'react']
});

// Modules
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('../client/components/app.jsx');

var kue = require('kue');
var emails = require('./queue/emails.js');

// Middleware
app.use(express.static('public'));

// Routes
app.get('/', function(req, res) {
  // Render React Component Server-Side
  var props = { title: 'Isomorphic Email Client' };
  var html = ReactDOMServer.renderToString(
    React.createElement(App, props)
  );
  res.send(html);
});

app.use('/queue', kue.app);  

// Socket Events
io.on('connection', function(socket) {
  socket.on('send_mail', function(data) {
    // console.log('Mail recieved: ', data);
    emails.create(data, function(){
    });
    socket.emit('mail_enqueued', 'Mail has been queued!');
  });
});


// Initialize
var PORT = 3000;

server.listen(PORT, function(err) {
  err ? console.log('server error', err) : console.log('server running port 3000');
});

module.exports = server;

