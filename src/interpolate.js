// What is the difference between the $parse, $interpolate and $compile services?
// http://stackoverflow.com/questions/17900588/what-is-the-difference-between-the-parse-interpolate-and-compile-services

// https://docs.angularjs.org/api/ng/service/$interpolate
// $interpolateProvider (service in module ng)
require("./jsdom")
var angular = require("angular")

var $interpolate = angular.injector(['ng']).get('$interpolate')

var exp = $interpolate('Hello {{name | uppercase}}!')
console.log(exp({ name: 'Angular' }))
