'use strict';
Results = angular.module('Results', ['Server', 'ui.bootstrap','uiSlider','/partials/slider_template.html'])

angular.module("/partials/slider_template.html", []).run ["$templateCache", ($templateCache)->
  $templateCache.put("/partials/slider_template.html",'<span class="bar"></span>'+
    '<span class="bar selection"></span>'+
    '<span class="pointer"></span>'+
    '<span class="pointer"></span>'+
    '<span class="bubble selection"></span>'+
    '<span ng-bind-html-unsafe="translate({value: floor})" class="bubble limit"></span>'+
    '<span ng-bind-html-unsafe="translate({value: ceiling})" class="bubble limit"></span>'+
    '<span class="bubble"></span>'+
    '<span class="bubble"></span>'+
    '<span class="bubble"></span>')]
    