angular.module('realEstateApp')
.controller 'PropertyCtrl', ($scope, PropertySupplier,$routeParams, $location)->
  query = PropertySupplier.find($routeParams.id)
  $scope.property = query.property
  if query.property_found == false
    $location.path '/not_found'

    