require("./jsdom")
var angular = require("angular")

var app = angular.module('app', ['ng'])
.directive('myName', function() {
  return {
    template: '{{name}}'
  }
})
.directive('myAttr', function() {
  return {
    restrict: 'A',
    template: '{{name}}'
  }
})
.directive('myIsolatedScope', function() {
  return {
    scope: {
      info: "=myInfo",
      title: "@"
    },
    template: '{{title}}-{{info.title}}'
  }
})

// directive must be registered before "bootstrap"
var $injector = angular.injector(['app'])
var $compile = $injector.get('$compile')
var $rootScope = $injector.get('$rootScope')

var scope = $rootScope.$new()
scope.name = 'little bird'

// myName as Element
var html = '<div><my-name></my-name></div>'

var template = angular.element(html);
var linkFn = $compile(template);
var element = linkFn(scope)

scope.$apply()

console.log("+++myName as Element")
console.log(element)
console.log(element.html())

// myAttr as Attribute
html = '<div my-attr></div>'
template = angular.element(html)
linkFn = $compile(template)
element = linkFn(scope)

scope.$apply()
console.log("+++myAttr as Attribute")
console.log(element)
console.log(element.html())

// myIsolatedScope
scope = $rootScope.$new()
scope.myInfo = { title: 'title in info' }
scope.title = 'little bird'

html = '<div><my-isolated-scope my-info="myInfo" title="title"></my-isolated-scope></div>'
template = angular.element(html)
linkFn = $compile(template)
element = linkFn(scope)

scope.$apply()
console.log("+++myIsolatedScope")
console.log(element)
console.log(element.html())
