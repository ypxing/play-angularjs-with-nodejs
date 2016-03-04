// - $parseProvider (service in module ng)
// https://docs.angularjs.org/api/ng/service/$parse
// Converts Angular expression into a function

require("./jsdom")
var angular = require("angular")

var $parse = angular.injector(['ng']).get('$parse')
var getter = $parse('user.name')
var setter = getter.assign

var context = { user: { name: 'angular' } }
var locals = { user: { name: 'local' } }

console.log(getter(context))
setter(context, 'newValue')
console.log(getter(context))

console.log(getter(context, locals))
