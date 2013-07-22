angular.module('Results').controller 'ResultsCtrl', ($scope, server, $filter)->
  $scope.show_filters = false
  $scope.units_in_range_indexes = []
  $scope.area_units = []
  $scope.page_units = []
  $scope.reverse_it = false
  $scope.num_units = 8
  $scope.order_by = 'price'
  $scope.order_direction = 'up'
  limit_to_filter = $filter('limitTo')
  order_by_filter = $filter('orderBy')
  sorted_fields = ['price', 'bathrooms', 'bedrooms']
  ############### price range ##########
  $scope.price_floor = 0
  $scope.price_ceiling = 0
  ############### bathroom range ##########
  $scope.bathroom_floor = 0
  $scope.bathroom_ceiling = 0
  $scope.open_loading_modal = true
  
  $scope.units_in_range = ->
    units = []
    for i in $scope.units_in_range_indexes
      units.push $scope.area_units[i]
    units
    

  $scope.$watch 'area_id', ->
    server.area_units  $scope.area_id, (data)->
      units = []
      for u, i in data.units
        unit = {}
        unit.id = u[data.meta.id]
        unit.price = u[data.meta.price]
        unit.img_url = data.meta.img_domain + u[data.meta.img_url]
        unit.bedrooms = u[data.meta.bedrooms]
        unit.bathrooms = u[data.meta.bathrooms]
        unit.address = u[data.meta.address]
        units.push unit
      $scope.area_units = units
      $scope.units_loaded = true
      $scope.open_loading_modal = false
      
  
  $scope.$watch 'area_units', ->
    $scope.numPages = Math.ceil ($scope.units_in_range().length / $scope.num_units)
    price_sorted = order_by_filter $scope.area_units, 'price'
    bathrooms_sorted = order_by_filter $scope.area_units, 'bathrooms'
    bedrooms_sorted = order_by_filter $scope.area_units, 'bedrooms'
    for i in [0..$scope.area_units.length-1]
      $scope.units_in_range_indexes.push i 
  
    for field in sorted_fields
      if eval(field+'_sorted.length') > 0
        $scope['min_' + field] = eval(field + '_sorted[0].' + field)
        $scope['max_' + field] = eval(field + '_sorted[' + field + '_sorted.length-1].'+ field)
        $scope[field + '_floor'] =  $scope['min_' + field]
        $scope[field + '_ceiling'] = $scope['max_' + field]
   
    $scope.page_units = $scope.units_in_range()[0..$scope.num_units-1]
    price_sorted = bathrooms_sorted = bedrooms_sorted = null
  
  is_in_range = (el)->
    el.price >= $scope.min_price &&
    el.price <= $scope.max_price &&
    el.bathrooms >= $scope.min_bathrooms  &&
    el.bathrooms <= $scope.max_bathrooms &&
    el.bedrooms >= $scope.min_bedrooms &&
    el.bedrooms <= $scope.max_bedrooms 

  $scope.$watch 'max_price + min_price + min_bathrooms + max_bathrooms + max_bedrooms + min_bedrooms', ->
    $scope.units_in_range_indexes = []
    if !Array.prototype.filter
      $($scope.area_units).filter  (i)->
        if is_in_range(this)
          $scope.units_in_range_indexes.push i 
    else
      $scope.area_units.filter (el, i)->
        if is_in_range(el)
          $scope.units_in_range_indexes.push i
      

  $scope.$watch 'num_units', ->
    $scope.page_units = $scope.units_in_range()[0..$scope.num_units-1]
    $scope.numPages = Math.ceil ($scope.units_in_range().length / $scope.num_units)
 
  $scope.reverse_order = ->
    $scope.reverse_it = !$scope.reverse_it
    if $scope.reverse_it then $scope.order_direction = 'down' else $scope.order_direction = 'up'
    $scope.numPages = Math.ceil ($scope.units_in_range().length / $scope.num_units)
  
  $scope.$watch '[order_by, reverse_it, units_in_range_indexes] | json', ->
    ordered_units = order_by_filter $scope.units_in_range(), $scope.order_by, $scope.reverse_it
    $scope.page_units = limit_to_filter ordered_units, $scope.num_units
    $scope.numPages = Math.ceil ($scope.units_in_range().length / $scope.num_units)


   
  $scope.currentPage = 1
  $scope.numPages = 30
  $scope.maxSize = 5
  $scope.$watch 'currentPage', ->
    $scope.selectPage(parseInt $scope.currentPage)

  $scope.selectPage = (pNum)->
    pNum = pNum-1
    per_page_units = parseInt($scope.num_units)-1
    pNum = 0 if !$scope.currentPage
    ordered_units = order_by_filter $scope.units_in_range(), $scope.order_by, $scope.reverse_it
    start_of_page = pNum*per_page_units
    end_of_page = start_of_page + per_page_units 
    page_units = ordered_units[start_of_page..end_of_page]
    $scope.page_units = page_units

  $scope.formatRange = (value)->
    '$' + value 
    
  $scope.open_unit = (id)->
    console.log "clicked "+ id