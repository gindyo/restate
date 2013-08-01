(function() {
  'use strict';
  angular.module('Restate', ['Results', 'Unit', 'HomePage', 'RestateDirectives', 'ui.bootstrap']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'views/home/index.html'
    }).when('/areas/:id', {
      controller: 'ResultsCtrl',
      templateUrl: 'views/results/index.html'
    }).when('/units/:id', {
      controller: 'UnitCtrl',
      templateUrl: 'views/units/index.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
