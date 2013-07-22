(function() {
  'use strict';
  angular.module('Restate', ['Results', 'HomePage', 'RestateDirectives']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      controller: 'HomeCtrl',
      templateUrl: 'views/home/index.html'
    }).when('/areas/:id', {
      controller: 'ResultsCtrl',
      templateUrl: 'views/results/index.html'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
