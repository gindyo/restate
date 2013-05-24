angular.module('realEstateApp')
.controller 'PropertyCtrl', ($scope,PropertySupplier,$routeParams, $location)->
  property = PropertySupplier.find($routeParams.id)
  if property
    $scope.property = property 
  else 
    $location.path '/not_found'

    