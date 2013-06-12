(function() {
  angular.module('realEstateApp').controller('SearchCtrl', function($scope, PropertySupplier, StockSupplier, StockRepository, $routeParams, $location) {
    $scope.property_search = function() {
      var property;

      property = PropertySupplier.find($scope.property_id);
      if (property) {
        $scope.property = property;
        return $location.path('properties/' + $scope.property_id);
      } else {
        return $location.path('/not_found');
      }
    };
    return $scope.stock_search = function() {
      return StockSupplier.get_stock($scope.stock_symbol, function(data) {
        StockRepository.search_results = data.query.results;
        return $location.path('/stocks/show_stock');
      });
    };
  });

}).call(this);
