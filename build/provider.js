"use strict";

require("./jsdom");
var angular = require("angular");

angular.module('app', []).factory('abc', function () {
  return {};
}).provider('a', function () {
  var name;

  this.setName = function (newName) {
    name = newName;
  };

  function Bird(newName) {
    this.name = newName;
  }

  this.$get = function () {
    return new Bird(name);
  };
}).config(["aProvider", function (aProvider) {
  aProvider.setName('little bird');
}]);

var $injector = angular.injector(['app']);
console.log($injector.get('a').name);