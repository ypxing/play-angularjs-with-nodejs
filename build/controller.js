"use strict";

require("./jsdom");
var angular = require("angular");

var app = angular.module('app', []);
var $injector = angular.injector(['ngMock', 'app']);

var $controller = $injector.get('$controller');

app.controller('FirstCtrl', ['$scope', function ($scope) {
  $scope.name = 'little bird';
}]);

var scope = {};
console.log($injector.get('FirstCtrl'));
console.log($controller('FirstCtrl', { $scope: scope }));