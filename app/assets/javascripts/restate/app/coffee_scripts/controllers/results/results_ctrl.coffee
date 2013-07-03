angular.module('Results').controller 'ResultsCtrl', ($scope, server, $filter)->
  $scope.area_units = []
  $scope.reverse_it = false
  $scope.num_units = 10
  $scope.current_page = 1
  $scope.no_of_pages = 5
  $scope.max_pages = 10 
  $scope.order_by = 'price'
  $scope.order_direction = 'up'
  limit_to_filter = $filter('limitTo')
  order_by_filter = $filter('orderBy')

  
  $scope.$watch 'area_id', ->
    server.area_units  $scope.area_id, (data)->
      $scope.area_units = data
  
  $scope.$watch 'area_units', ->
    $scope.units = $scope.area_units

  $scope.$watch 'num_units', ->
    $scope.units = $scope.area_units[0..$scope.num_units-1]
  
  $scope.reverse_order = ->
    $scope.reverse_it = !$scope.reverse_it
    if $scope.reverse_it then $scope.order_direction = 'down' else $scope.order_direction = 'up'
  
  $scope.$watch '[order_by, reverse_it] | json', ->
    ordered_units = order_by_filter $scope.area_units, $scope.order_by, $scope.reverse_it
    $scope.units = limit_to_filter ordered_units, $scope.num_units

  

