(function() {
  'use strict';  angular.module('realEstateApp').controller('StockCtrl', function($scope, StockRepository) {
    $scope.stock = {
      symbol: 'N/A',
      LastTradePriceOnly: 'N/A'
    };
    if (StockRepository.search_results) {
      return $scope.stock = StockRepository.search_results.quote;
    }
  });

}).call(this);
