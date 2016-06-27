require("./jsdom")
var angular = require("angular")

var app = angular.module('app', []);
app.directive('newElem', function() {
  return {
    compile: function(tElem, tAttrs) {
      tElem.replaceWith(angular.element('<p>' + tElem.text() + '</p>'));
    },
    controller: function($scope) {
      $scope.name = 'little bird';
    },

    template: '<span>{{name}}</span>',
  }
});

var $injector = angular.bootstrap(document, ['app']);
var $controller = $injector.get('$controller');
var $rootScope = $injector.get('$rootScope')

// apply this controller to ng-controller
var $compile = $injector.get('$compile');
var html = '<div><new-elem></new-elem><div>{{name}}</div></div>';

var linkFn = $compile(html);
var scope = $rootScope.$new();
scope.anotherName = 'not in FirstCtrl';
var elementResult = linkFn(scope);

$rootScope.$apply();
console.log(elementResult.html());
