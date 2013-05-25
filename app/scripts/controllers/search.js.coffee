angular.module('realEstateApp')
.controller 'SearchCtrl', ($scope,PropertySupplier, StockSupplier, $routeParams, $location)->
  $scope.property_search = ->
    property = PropertySupplier.find($scope.property_id)
    if property
      $scope.property = property 
      $location.path 'properties/'+$scope.property_id
    else 
      $location.path '/not_found'
  $scope.stock_search = ->
    StockSupplier.get_stock $scope.stock_symbol, ->
      console.log 'result is ' + window.stock_quote_result