angular.module('HomePage', ['Server'])
angular.module('HomePage').controller 'HomeCtrl', ($scope, server, units, $timeout)->
  $scope.styles = 'home-body'
  units_inst = new units()
  $scope.all_areas = []
  $scope.featuredUnits = {}

  units_inst.pagination.numPerPage = 1
  $scope.units = units_inst
  if !$scope.units.unitsLoaded()
    $scope.units.load(0)

  $scope.featuredUnits['next'] = ->
    if $scope.units.pagination.currentPage < $scope.units.pagination.numOfPages()
      $scope.units.pagination.currentPage = $scope.units.pagination.currentPage + 1
    else 
      $scope.units.pagination.currentPage = 1 

  nextFeatured = ->
    $scope.featuredUnits.next()
    $timeout nextFeatured, 5000
  $timeout nextFeatured, 5000

  server.allAreas (data)->
    $scope.allAreas = data
  $scope.$watch 'units.unitsLoaded()', ->
    $scope.featuredUnits.currentPage = $scope.units.currentPage()
  $scope.$watch 'units.pagination.currentPage', ->
    $scope.featuredUnits.currentPage = $scope.units.currentPage()
    
  	
    