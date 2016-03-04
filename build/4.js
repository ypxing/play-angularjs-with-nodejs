"use strict";

require("./jsdom");
var angular = require("angular");
var app = angular.module('app', ['ng']);
app.directive('abc', function ($timeout) {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    link: function link(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$render = function () {
        element.html(ngModelCtrl.$viewValue);
      };

      ngModelCtrl.$formatters.push(function (modelValue) {
        return modelValue;
      });

      ngModelCtrl.$parsers.push(function (viewValue) {
        ngModelCtrl.$render();
        return viewValue;
      });

      $timeout(function () {
        ngModelCtrl.$setViewValue(4);
        scope.$emit('abc');
      }, 1000);
    }
  };
});

//var injector = angular.injector(['app'])
var injector = angular.bootstrap(document, ['app']);

var $compile = injector.get('$compile');
var $rootScope = injector.get('$rootScope');

var scope = $rootScope.$new();
scope.a = { b: 1 };

var $element = angular.element('<div ng-model="a.b" abc></div>');
//var $element = angular.element('<div ng-bind="a"></div>')
var linkFn = $compile($element);
var element = linkFn(scope);

scope.$on('abc', function () {
  console.log(element.html());
});