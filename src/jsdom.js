var jsdom = require('jsdom')
var path = require("path")

// setup the simplest document possible
export const jsHeader = `<!doctype html><html><head><link rel="stylesheet" type="text/css" href="${path.join(__dirname, "../src")}/style.css"></head><body>`
export const jsFooter = '</body></html>'

export function htmlString(body) {
  if (!body && body !== '') {
    body = jsContainer.innerHTML;
  }

  return jsHeader + body + jsFooter;
}

export var jsDoc = jsdom.jsdom(htmlString(''))

// get the window object out of the document
var win = jsDoc.defaultView

global.document = jsDoc
global.window = win
global.navigator = win.navigator = {};
global.Node = win.Node;
