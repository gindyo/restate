angular.module('Unit', [])
angular.module('Unit').controller "UnitCtrl", (unit, $scope, $routeParams)->
  $scope.unit = {}
  $scope.unit = new unit()
  $scope.unit.load $routeParams.id
  $scope.$watch 'unit.pictures.length > 0'
  
  $scope.dateOptions = {
  	numberOfMonths: 3
  }

