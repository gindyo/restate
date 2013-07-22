'use strict';

angular.module('Restate', ['Results', 'HomePage']).config ($routeProvider) ->
  $routeProvider
    .when('/areas/:id', {
      controller: 'ResultsCtrl'
    })
    .otherwise redirectTo: '/'
 
