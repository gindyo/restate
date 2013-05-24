'use strict';

angular.module('realEstateApp', ['Services'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when("/properties/:id",{
        templateUrl: 'views/property.html',
        controller: 'PropertyCtrl'
      })
      .when('/not_found', {
        templateUrl: 'views/not_found.html',
        controller: 'NotFoundCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
angular.module('Services', [])