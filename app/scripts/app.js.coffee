'use strict';

angular.module('realEstateApp', ['Services']).config ($routeProvider)-> 
  routes = [
    #[when, view, cntroller]
    ['/','/views/main.html', 'MainCtrl']
    ['/properties/:id', 'views/property.html', 'PropertyCtrl']
    ['/not_found', 'views/not_found']
    ['/stocks/show_stock/', 'views/stock_symbol.html', 'StockCtrl']
  ] 
  for route in routes
    $routeProvider.when route[0], {
        templateUrl: route[1]
        controller: route[2]
      }
  $routeProvider.when().otherwise
    redirectTo: '/'

angular.module('Services', [])