'use strict';

angular.module('realEstateApp')
  .controller 'StockCtrl', ($scope, $location) ->
    $scope.search = ->
      $location.path 'properties/'+$scope.property_id

