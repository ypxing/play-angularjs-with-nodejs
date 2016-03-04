require("./jsdom")
var angular = require("angular")

var app = angular.module('app', [])
.factory('abc', function() { return {} })

// $injector covers two modules
var $injector = angular.injector(['ng', 'app']);
var $rootScope = $injector.get('$rootScope');
console.log($injector.has('$rootScope'));
console.log($injector.has('abc'));


// $injector only covers 'ng'
$injector = angular.injector(['ng']);
console.log($injector.has('$rootScope'));
console.log($injector.has('abc'));


// $injector only covers 'app'
$injector = angular.injector(['app']);
console.log($injector.has('$rootScope'));
console.log($injector.has('abc'));

console.log($rootScope);
var child = $rootScope.$new();
console.log($rootScope === child.$parent)

child.$watch('myProperty', function(newP, oldP) {
  console.log('here?');
});

child.myProperty = 't';
child.$apply()
