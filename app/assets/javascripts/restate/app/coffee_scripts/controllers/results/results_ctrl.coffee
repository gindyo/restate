angular.module('Results').controller 'ResultsCtrl', ($scope, server)->
  $scope.area_units = []
  $scope.$watch 'area_id', ->
    server.area_units  $scope.area_id, (data)->
      $scope.area_units = data
  $scope.$watch 'area_units', ->
    $scope.units = $scope.area_units
