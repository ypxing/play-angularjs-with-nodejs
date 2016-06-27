// https://docs.angularjs.org/api/ng/directive/ngController
// The ngController directive attaches a controller class to the view.
// This is a key aspect of how angular supports the principles behind the Model-View-Controller design pattern.

require("./jsdom")
var angular = require("angular")

var app = angular.module('app', []);
app.controller('FirstCtrl', ['$scope', function($scope) {
  $scope.name = 'little bird'
}])

var $injector = angular.bootstrap(document, ['app']);
var $controller = $injector.get('$controller');
var $rootScope = $injector.get('$rootScope')

var scopeInFirstCtrl = $rootScope.$new();
$controller('FirstCtrl', { $scope: scopeInFirstCtrl })

// apply this controller to ng-controller
var $compile = $injector.get('$compile');
var html = '<div ng-controller="FirstCtrl"><span>{{name}}</span><span>{{anotherName}}</span></div>';

var linkFn = $compile(html);
var scope = $rootScope.$new();
scope.anotherName = 'not in FirstCtrl';
var elementResult = linkFn(scope);

$rootScope.$apply();
console.log(elementResult.html());
