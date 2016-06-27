var jsdom = require('jsdom')
var path = require("path")

// setup the simplest document possible
var jsHeader = '<!doctype html><html><head><link rel="stylesheet" type="text/css" href="' + path.join(__dirname, "../src") + '/style.css"></head><body>'
var jsFooter = '</body></html>'

htmlString = function(body) {
  if (!body && body !== '') {
    body = jsContainer.innerHTML;
  }

  return jsHeader + body + jsFooter;
}

var jsDoc = jsdom.jsdom(htmlString(''))

module.exports = {
  jsHeader: jsHeader,
  jsFooter: jsFooter,
  htmlString: htmlString,
  jsDoc: jsDoc
}

// get the window object out of the document
var win = jsDoc.defaultView

global.document = jsDoc
global.window = win
global.navigator = win.navigator = {};
global.Node = win.Node;
