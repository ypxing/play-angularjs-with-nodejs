require("../jsdom")
var angular = require("angular")

var app = angular.module('app', []);
app.directive('newElem', function() {
  return {
    compile: function(tElem, tAttrs) {
      console.log('in compile');
      tElem.replaceWith(angular.element('<p>' + tElem.text() + '</p>'));
      return {
        pre: function($scope, $element, $attributes, controller) {
          console.log($scope.id + ': in pre link');
        },
        post: function($scope, $element, $attributes, controller) {
          console.log($scope.id + ': in post link')
        }
      }
    },
    controller: function($scope) {
      console.log($scope.id + ': in constroller');
      $scope.name = 'little bird';
    },
    scope: {
      id: '@'
    },
    template: '<span>{{id}} - {{name}}</span>',
  }
});

var $injector = angular.bootstrap(document, ['app']);
var $rootScope = $injector.get('$rootScope')

var $compile = $injector.get('$compile');
var html = '<div><new-elem id="{{id1}}"></new-elem><new-elem id="{{id2}}"></new-elem><div>{{name}}</div></div>';

var linkFn = $compile(html);
var scope = $rootScope.$new();
scope.id1 = 1
scope.id2 = 2
var elementResult = linkFn(scope);

console.log('before calling apply');
console.log(elementResult.html());

$rootScope.$apply();
console.log(elementResult.html());

scope.id1 = 3
scope.id2 = 4
$rootScope.$apply();
console.log(elementResult.html());
