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
  it('should be true', function() {
    var props = { title: 'Isomorphic Email Client' };
    var html = ReactDOMServer.renderToString(
      React.createElement(App, props)
    );
    global.document = jsdom.jsdom(html);
    global.window = global.document.defaultView;
    const $ = _$(window);
    chaiJquery(chai, chai.util, $);
    console.log($('body'));
    expect(typeof html).to.equal('string');
  });
});
