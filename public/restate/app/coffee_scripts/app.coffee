'use strict';

angular.module('Restate', ['Results', 'HomePage', 'RestateDirectives', 'ui.bootstrap']).config ($routeProvider) ->
  $routeProvider
    .when('/', {
      controller: 'HomeCtrl'
      templateUrl: 'views/home/index.html'
    })
    .when('/areas/:id', {
      controller: 'ResultsCtrl'
      templateUrl: 'views/results/index.html'
    })
    .when('/units/:id', {
      controller: 'UnitsCtrl'
      templateUrl: 'views/units/index.html'
    })
    .otherwise redirectTo: '/'
 
