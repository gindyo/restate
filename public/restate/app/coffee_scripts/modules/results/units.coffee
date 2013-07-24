angular.module('Results').service 'Units', (server, $filter)->
  @all = {}
  # limit_to_filter = $filter('limitTo')
  # order_by_filter = $filter('orderBy')
  # in_range_indexes = []
  # filter = ->
  #   min: 0
  #   max: 0
  #   current_low: 0
  #   current_high: 0
  # filters = {
  #     price: @filter()
  #     bathrooms: @filter()
  #     bedrooms: @filter()
  #   }
  @load = (id)=>
    server.area_units  id, (data)->
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
      @all = units
  
  # in_range = ->
  #   units = []
  #   for i in in_range_indexes
  #     units.push $scope.area_units[i]
  #   units

  # sorted_by = (field)->
  #   order_by_filter @all, field

  

  return {  
    all: @all
    sorted_by: @sorted_by
    filters: @filters
    load: @load
    #in_range: @in_range()
  }