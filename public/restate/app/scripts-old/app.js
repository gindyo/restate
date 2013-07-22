(function() {
  'use strict';
  angular.module('Restate', ['Results', 'HomePage']).config(function($routeProvider) {
    return $routeProvider.when('/areas/:id', {
      controller: 'ResultsCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
