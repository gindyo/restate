angular.module('Unit', [])
angular.module('Unit').controller "UnitCtrl", (unit, $scope, $routeParams)->
  $scope.unit = {}
  $scope.unit = new unit()
  $scope.unit.load $routeParams.id
  $scope.$watch 'unit.pictures.length > 0'
  
  $scope.dateOptions = {
  	numberOfMonths: 3
  }
  
  $scope.maprefresh = false
  $scope.mapselected = ->
    $scope.maprefresh = true


  $scope.$watch 'center.latitude', ->
    console.log $scope.center
 
  angular.extend $scope, {
    center: 
      latitude: 38.888
      longitude: -84.556
    markers: [] 
    zoom: 8
  }
