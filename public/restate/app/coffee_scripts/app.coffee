'use strict'

angular.module('Restate', ['google-maps','FloorPlan', 'Results','Unit', 'HomePage', 'RestateDirectives', 'ui.bootstrap', 'ui.date']).config ($routeProvider, $locationProvider) ->
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
      controller: 'UnitCtrl'
      templateUrl: 'views/units/index.html'
    })
    .otherwise redirectTo: '/'

