"use strict";

require("./jsdom");
var angular = require("angular");
require("angular-sanitize");

var $injector = angular.injector(['ng', 'ngSanitize']);
var $compile = $injector.get('$compile');
var $rootScope = $injector.get('$rootScope');
var $sce = $injector.get('$sce');
var scope = $rootScope.$new();
scope.myHtml = '<p>abc</p><script>aaa</script>';

// encode all tags
var $element = angular.element('<div ng-bind="myHtml"></div>');
var linkFn = $compile($element);
var element = linkFn(scope);

$rootScope.$apply();

console.log(element.html());

// sanitize some tags like <script> but keep "safe" tags
$element = angular.element('<div ng-bind-html="myHtml"></div>');
linkFn = $compile($element);
element = linkFn(scope);

$rootScope.$apply();
console.log(element.html());

// just trust all
scope.trustedHtml = $sce.trustAsHtml(scope.myHtml);
$element = angular.element('<div ng-bind-html="trustedHtml"></div>');
linkFn = $compile($element);
element = linkFn(scope);

$rootScope.$apply();
console.log(element.html());