require("../jsdom")
var angular = require("angular")

var app = angular.module('app', []);
app.directive('noScope', function() {
  return {
    controller: function($scope) {
      $scope.newName = 'big bird';
    },
    template: '<span>name: {{name}}, new name: {{newName}}</span>',
  }
});

app.directive('inheritScope', function() {
  return {
    scope: true, // inherit from parent
    controller: function($scope) {
      $scope.newName = 'big bird';
    },
    template: '<span>name: {{name}}, new name: {{newName}}</span>',
  }
});

app.directive('isolatedScope', function() {
  return {
    scope: {
      name: '=?'
    },
    controller: function($scope) {
      $scope.newName = 'big bird';
    },
    template: '<span>name: {{name}}, new name: {{newName}}</span>',
  }
});

var $injector = angular.bootstrap(document, ['app']);
var $rootScope = $injector.get('$rootScope')
var $compile = $injector.get('$compile');

console.log('1. no scope: use parent scope');
var noScopeHtml = '<div><no-scope></no-scope><div>{{name}} - {{newName}}</div></div>';
var linkFn = $compile(noScopeHtml);
var parentScope = $rootScope.$new();
parentScope.name = 'little bird';
var elementResult = linkFn(parentScope);

$rootScope.$apply();
console.log(elementResult.html());

console.log('2. inherited scope: new scope inherited from parent');
var inheritScopeHtml = '<div><inherit-scope></inherit-scope><div>{{name}} - {{newName}}</div></div>';
parentScope = $rootScope.$new();
parentScope.name = 'little bird';
elementResult = $compile(inheritScopeHtml)(parentScope);

$rootScope.$apply();
console.log(elementResult.html());

console.log('3. isolated scope: pass everything explicitly');
var isolatedScopeHtml = '<div><isolated-scope></isolated-scope><div>{{name}} - {{newName}}</div></div>';
parentScope = $rootScope.$new();
parentScope.name = 'little bird';
elementResult = $compile(isolatedScopeHtml)(parentScope);

$rootScope.$apply();
console.log(elementResult.html());