'use strict';

angular.module('realEstateApp')
  .controller 'StockCtrl', ($scope, StockRepository) ->
    
    $scope.stock = {symbol: 'N/A', LastTradePriceOnly: 'N/A'}
    $scope.stock = StockRepository.search_results.quote  if StockRepository.search_results
    console.log $scope.stock