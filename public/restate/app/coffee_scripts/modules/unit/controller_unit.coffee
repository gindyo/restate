angular.module('Unit', [])
angular.module('Unit').controller "UnitCtrl", (unit, $scope, $routeParams)->
  $scope.unit = unit
  $scope.unit.load $routeParams.id
  $scope.$watch 'unit.pictures[0]', ->
  	$scope.pictures = $scope.unit.pictures

  $scope.dateOptions = {
  	numberOfMonths: 3
  }
