// Babel require hook for react-preset, enables server to transpile React JSX
require('babel-register')({
  presets: ['es2015', 'react']
});

var express = require('express');
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('../client/components/app.jsx');

app.use(express.static('public'));

app.get('/', function(req, res) {
  var props = { title: 'Universal React' };
  var html = ReactDOMServer.renderToString(
    React.createElement(App, props)
  );
  res.send(html);
});

var PORT = 3000;

app.listen(PORT, function() {
  console.log('http://localhost:' + PORT);
});

