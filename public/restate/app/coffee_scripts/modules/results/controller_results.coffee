Results = angular.module('Results', ['Server'])

Results.controller 'ResultsCtrl', ($scope, server, Units)->
  $scope.slidingMin = 0
  $scope.slidingMax = 0
  $scope.units = Units
  $scope.units.load(1)
  $scope.$watch 'units.filters.inRangeIndexes[0] | json',->
    $scope.currentPage = $scope.units.currentPage()
    $scope.units.applyFilters()
  $scope.bathroomsSliderChange = (values)->
    $scope.units.filters.ranges.bathrooms.current[0] = values.lo
    $scope.units.filters.ranges.bathrooms.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  $scope.priceSliderChange = (values)->
    $scope.units.filters.ranges.price.current[0] = values.lo
    $scope.units.filters.ranges.price.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  $scope.bedroomsSliderChange = (values)->
    $scope.units.filters.ranges.bedrooms.current[0] = values.lo
    $scope.units.filters.ranges.bedrooms.current[1] = values.hi
    $scope.units.applyFilters()
    updatePage()
  updatePage = ->
    $scope.$apply ->  
      $scope.currentPage = $scope.units.currentPage()
  
  $scope.$watch 'units.pagination.currenPage + units.pagination.numPerPage',->
    console.log $scope.units.pagination
    $scope.currentPage = $scope.units.currentPage()

  $scope.$watch 'units.filters.orderBy',->
    console.log 'hi'
    $scope.units.resort()
    $scope.currentPage = $scope.units.currentPage()

  $scope.changePage = (pNum)-> 
    $scope.units.pagination.currentPage = pNum
    $scope.currentPage = $scope.units.page(pNum)
  
  $scope.reverseOrder = ->
    $scope.units.filters.reverseIt = !$scope.units.filters.reverseIt
    $scope.units.resort()
    $scope.units.applyFilters()
    $scope.currentPage = $scope.units.currentPage()
  
  