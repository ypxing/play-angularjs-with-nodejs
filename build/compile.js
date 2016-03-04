"use strict";

require("./jsdom");
var angular = require("angular");

var $injector = angular.injector(['ng']);
var $compile = $injector.get('$compile');

var $rootScope = $injector.get('$rootScope');

var scope = $rootScope.$new();

scope.exp = 'show me';

var html = '<div ng-bind="exp"></div>';

var template = angular.element(html);
var linkFn = $compile(template);

var element = linkFn(scope);
scope.$apply();
console.log(element.html());