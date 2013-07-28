Results = angular.module('Results', ['Server'])

Results.controller 'ResultsCtrl', ($scope, server, Units)->
  $scope.slidingMin = 0
  $scope.slidingMax = 0
  $scope.units = Units
  $scope.units.load(1)
  $scope.$watch '[units.all[0], units.pagination, units.filters] | json', ->
    console.log $scope.units.all
    $scope.units.applyFilters()
    $scope.currentPage = $scope.units.currentPage()
    $scope.units.loaded = true  
  $scope.changePage = (pNum)-> $scope.units.pagination.currentPage = pNum

  $scope.testSort = ->
    console.log $scope.units.all
    $scope.units.mergeSort($scope.units.all, 0)
  
  

  
  # $scope.area_units = []
  # $scope.page_units = []
  # $scope.reverse_it = false
  # $scope.num_units = 8
  # $scope.order_by = 'price'
  # $scope.order_direction = 'up'
  # sorted_fields = ['price', 'bathrooms', 'bedrooms']
  # $scope.units = Units
  
  
  #$scope.units.in_range_indexes = []
  # $scope.units.filters.have_changed = ->
  #   JSON.stringify($scope.units.filters)
  
  
  
  # $scope.$watch 'area_units', ->
  #   $scope.numPages = Math.ceil ($scope.units.in_range().length / $scope.num_units)
  #   price_sorted = order_by_filter $scope.area_units, 'price'
  #   bathrooms_sorted = order_by_filter $scope.area_units, 'bathrooms'
  #   bedrooms_sorted = order_by_filter $scope.area_units, 'bedrooms'
  #   for i in [0..$scope.area_units.length-1]
  #     $scope.units.in_range_indexes.push i 
  #   f = $scope.units.filters
  #   for field in sorted_fields
  #     if eval(field+'_sorted.length') > 0
  #       f[field].low = $scope.units.min[field] = eval(field + '_sorted[0].' + field)
  #       f[field].high = $scope.units.max[field] = eval(field + '_sorted[' + field + '_sorted.length-1].'+ field)
        
  #   $scope.page_units = $scope.units.in_range()[0..$scope.num_units-1]
  #   price_sorted = bathrooms_sorted = bedrooms_sorted = null
  
  # is_in_range = (el)->
  #   el.price >= $scope.units.filters.price.low &&
  #   el.price <= $scope.units.filters.price.high &&
  #   el.bathrooms >= $scope.units.filters.bathrooms.low  &&
  #   el.bathrooms <= $scope.units.filters.bathrooms.max &&
  #   el.bedrooms >= $scope.units.filters.bedrooms.low &&
  #   el.bedrooms <= $scope.units.filters.bedrooms.max 


  # $scope.$watch 'units.filters.have_changed()', ->
  #   console.log $scope.units.filters.price

  #   $scope.units.in_range_indexes = []
  #   if !Array.prototype.filter
  #     $($scope.area_units).filter  (i)->
  #       if is_in_range(this)
  #         $scope.units.in_range_indexes.push i 
  #   else
  #     $scope.area_units.filter (el, i)->
  #       if is_in_range(el)
  #         $scope.units.in_range_indexes.push i
      

  # $scope.$watch 'num_units', ->
  #   $scope.page_units = $scope.units.in_range()[0..$scope.num_units-1]
  #   $scope.numPages = Math.ceil ($scope.units.in_range().length / $scope.num_units)
 
  # $scope.reverse_order = ->
  #   $scope.reverse_it = !$scope.reverse_it
  #   if $scope.reverse_it then $scope.order_direction = 'down' else $scope.order_direction = 'up'
  #   $scope.numPages = Math.ceil ($scope.units.in_range().length / $scope.num_units)
  
  # $scope.$watch '[order_by, reverse_it, units.in_range_indexes] | json', ->
  #   ordered_units = order_by_filter $scope.units.in_range(), $scope.order_by, $scope.reverse_it
  #   $scope.page_units = limit_to_filter ordered_units, $scope.num_units
  #   $scope.numPages = Math.ceil ($scope.units.in_range().length / $scope.num_units)


   
  # $scope.currentPage = 1
  # $scope.numPages = 30
  # $scope.maxSize = 5
  # $scope.$watch 'currentPage', ->
  #   $scope.selectPage(parseInt $scope.currentPage)

  # $scope.selectPage = (pNum)->
  #   pNum = pNum-1
  #   per_page_units = parseInt($scope.num_units)-1
  #   pNum = 0 if !$scope.currentPage
  #   ordered_units = order_by_filter $scope.units.in_range(), $scope.order_by, $scope.reverse_it
  #   start_of_page = pNum*per_page_units
  #   end_of_page = start_of_page + per_page_units 
  #   page_units = ordered_units[start_of_page..end_of_page]
  #   $scope.page_units = page_units

  # $scope.formatRange = (value)->
  #   '$' + value 
    
  # $scope.open_unit = (id)->
  #   console.log "clicked "+ id