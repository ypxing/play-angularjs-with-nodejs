"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlString = htmlString;
var jsdom = require('jsdom');
var path = require("path");

// setup the simplest document possible
var jsHeader = exports.jsHeader = "<!doctype html><html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"" + path.join(__dirname, "../src") + "/style.css\"></head><body>";
var jsFooter = exports.jsFooter = '</body></html>';

function htmlString(body) {
  if (!body && body !== '') {
    body = jsContainer.innerHTML;
  }

  return jsHeader + body + jsFooter;
}

var jsDoc = exports.jsDoc = jsdom.jsdom(htmlString(''));

// get the window object out of the document
var win = jsDoc.defaultView;

global.document = jsDoc;
global.window = win;
global.navigator = win.navigator = {};
global.Node = win.Node;