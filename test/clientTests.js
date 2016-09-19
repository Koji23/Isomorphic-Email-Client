require('babel-register')({
  presets: ['es2015', 'react']
});
var chai = require('chai');
var expect = chai.expect;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('../client/components/app.jsx');
var jsdom = require('jsdom');
var chaiJquery = require('chai-jquery');
var _$ = require('jquery');

describe('Isomorphic React Client', function() {
  before(function() {
    global.props = { title: 'Isomorphic Email Client' };
    var html = ReactDOMServer.renderToString(
      React.createElement(App, props)
    );
    global.document = jsdom.jsdom(html);
    global.window = global.document.defaultView;
    global.$ = _$(window);
    chaiJquery(chai, chai.util, $);
  });
  it('should render an html element', function() {
    expect($('html').length).to.exist;
  });
  it('should render a form element', function() {
    expect($('form').length).to.exist;
  });
  it('should recieve title from props', function() {
    expect($($('h1')[0]).text()).to.equal(props.title);
  });
});
