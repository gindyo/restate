angular.module('Results').service 'Units', (server, $filter)->
  all = []
  order_by_filter = $filter('orderBy')
  
  pagination = {
    currentPage: 1
    num_per_page: 8
  }
  filters = {
    order_by: 'price'
    reverse_it: false
    in_range_indexes: []
    ranges: {
      price: {
        edges: []
        current: []
      }
      bathrooms: {
        edges: []
        current: []
      }
      bedrooms: {
        edges: []
        current: []
      }
    }
  }
  is_in_range = (el)->
    el.price >= filters.ranges.price.current[0] &&
    el.price <= filters.ranges.price.current[1] &&
    el.bathrooms >= filters.ranges.bathrooms.current[0]  &&
    el.bathrooms <= filters.ranges.bathrooms.current[1] &&
    el.bedrooms >= filters.ranges.bedrooms.current[0] &&
    el.bedrooms <= filters.ranges.bedrooms.current[1] 
  
  apply_filters = ->
    if !Array.prototype.filter
      $(all).filter  (i)->
        if is_in_range(this)
          filters.in_range_indexes.push i 
    else
      all.filter (el, i)->
        if is_in_range(el)
          filters.in_range_indexes.push i
    console.log filters.in_range_indexes

  get_edges = (obj, field)->
    edges = []
    ordered = order_by_filter obj, field
    edges[0] = ordered[0][field]
    edges[1] = ordered[ordered.length-1][field]
    edges

  
  load = (id)->
    server.area_units id, (data)->
      units = []
      for u, i in data.units
        unit = {}
        unit.id = u[data.meta.id]
        unit.price = u[data.meta.price]
        unit.img_url = data.meta.img_domain + u[data.meta.img_url]
        unit.bedrooms = u[data.meta.bedrooms]
        unit.bathrooms = u[data.meta.bathrooms]
        unit.address = u[data.meta.address]
        all.push unit
      filters.ranges.price.current = filters.ranges.price.edges = get_edges(all, 'price')
      filters.ranges.bathrooms.current = filters.ranges.bathrooms.edges = get_edges(all, 'bathrooms')
      filters.ranges.bedrooms.current = filters.ranges.bedrooms.edges = get_edges(all, 'bedrooms')
      #apply_filters()
  

  sorted_units = ()->
    order_by_filter @all, filters.order_by, filters.reverse_it

  
  units_in_range = ->
    units = []
    for i in filters.in_range_indexes
      units.push all[i]
    units
  
  select_page = (pNum)->
    pNum = pNum-1
    per_page_units = parseInt(pagination.num_per_page)-1
    pNum = 0 if !pagination.currentPage
    ordered_units = order_by_filter units_in_range(), filters.order_by, filters.reverse_it
    page_units = []
    for i in[(pNum*pagination.num_per_page)..pagination.num_per_page-1] by 1
      page_units.push all[filters.in_range_indexes[i]]
    console.log page_units
    page_units
  
  return { 
    pagination: pagination 
    filters: filters
    apply_filters: apply_filters
    all: all
    load: load
    page: select_page

    #in_range: @in_range()
  }