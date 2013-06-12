angular.module('realEstateApp')
.controller 'SearchCtrl', ($scope,PropertySupplier, StockSupplier, StockRepository, $routeParams, $location)->
  $scope.property_search = ->
    property = PropertySupplier.find($scope.property_id)
    if property
      $scope.property = property 
      $location.path 'properties/'+$scope.property_id
    else 
      $location.path '/not_found'
  $scope.stock_search = ->
    StockSupplier.get_stock $scope.stock_symbol, (data)->
      StockRepository.search_results = data.query.results
      $location.path '/stocks/show_stock'