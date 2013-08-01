Results = angular.module('Results', ['Server'])

Results.controller 'ResultsCtrl', ($scope, server, units, $routeParams)->
  
  $scope.slidingMin = 0
  $scope.slidingMax = 0
  $scope.units = units
  $scope.filters = units.filters
  $scope.pagination = units.pagination

  $scope.units.applyFilters()
  if !$scope.units.unitsLoaded()
    $scope.units.load(1)
  $scope.$watch 'units.filters.inRangeIndexes[0] | json',->
    $scope.currentPage = $scope.units.currentPage()
    $scope.units.applyFilters()
  $scope.bathroomsSliderChange = (values)->
    $scope.filters.ranges.bathrooms.current[0] = values.lo
    $scope.filters.ranges.bathrooms.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  $scope.priceSliderChange = (values)->
    units.filters.ranges.price.current[0] = $scope.filters.ranges.price.current[0] = values.lo
    $scope.filters.ranges.price.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  $scope.bedroomsSliderChange = (values)->
    $scope.filters.ranges.bedrooms.current[0] = values.lo
    $scope.filters.ranges.bedrooms.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  updatePage = ->
    $scope.$apply ->  
      $scope.currentPage = $scope.units.currentPage()
  
  $scope.$watch 'units.pagination.currenPage + units.pagination.numPerPage',->
    console.log $scope.pagination
    $scope.currentPage = $scope.units.currentPage()

  $scope.$watch 'units.filters.orderBy',->
    console.log 'hi'
    $scope.units.resort()
    $scope.currentPage = $scope.units.currentPage()

  $scope.changePage = (pNum)-> 
    $scope.pagination.currentPage = pNum
    $scope.currentPage = $scope.units.page(pNum)
  
  $scope.reverseOrder = ->
    $scope.filters.reverseIt = !$scope.filters.reverseIt
    $scope.units.resort()
    $scope.units.applyFilters()
    $scope.currentPage = $scope.units.currentPage()
  
  