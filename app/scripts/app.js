(function() {
  'use strict';  angular.module('realEstateApp', ['Services']).config(function($routeProvider) {
    var route, routes, _i, _len;

    routes = [['/', '/views/main.html', 'MainCtrl'], ['/properties/:id', 'views/property.html', 'PropertyCtrl'], ['/not_found', 'views/not_found'], ['/stocks/show_stock/', 'views/stock_symbol.html', 'StockCtrl']];
    for (_i = 0, _len = routes.length; _i < _len; _i++) {
      route = routes[_i];
      $routeProvider.when(route[0], {
        templateUrl: route[1],
        controller: route[2]
      });
    }
    return $routeProvider.when().otherwise({
      redirectTo: '/'
    });
  });

  angular.module('Services', []);

}).call(this);
