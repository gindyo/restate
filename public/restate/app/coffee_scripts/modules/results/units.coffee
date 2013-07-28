angular.module('Results').service 'Units', (server, $filter)->
  all = []
  meta = []
  orderByFilter = $filter('orderBy')
  
  pagination = {}
  
  calculateNumOfPages = ->
    if all.length > pagination.numPerPage then Math.ceil(all.length / pagination.numPerPage) else 1 
  

  pagination = {
    currentPage: 1
    numPerPage: 8
  }
  pagination['numOfPages'] = calculateNumOfPages

  filters = {
    orderBy: 'price'
    reverseIt: false
    inRangeIndexes: []
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
  isInRange = (el)->
    el['price'] >= filters.ranges.price.current[0] &&
    el['price'] <= filters.ranges.price.current[1] &&
    el['bathrooms'] >= filters.ranges.bathrooms.current[0]  &&
    el['bathrooms'] <= filters.ranges.bathrooms.current[1] &&
    el['bedrooms'] >= filters.ranges.bedrooms.current[0] &&
    el['bedrooms'] <= filters.ranges.bedrooms.current[1] 
  
  applyFilters = ->
    filters.inRangeIndexes = []
    if !Array.prototype.filter
      $(all).filter  (i)->
        if isInRange(this)
          filters.inRangeIndexes.push i 
    else
       all.filter (el, i)->
        if isInRange(el)
          filters.inRangeIndexes.push i
 
  getEdges = (obj, field)->
    min = obj[0][meta[field]]
    max = obj[1][meta[field]]

    obj.filter (el)->
      if el[meta[field]]<min 
        min = el[meta[field]]
      if el[meta[field]] > max 
        max = el[meta[field]]
    [min, max]


  
  # load = (id)->
  #   server.areaUnits id, (data)->
  #     units = []
  #     for u, i in data.units
  #       unit = {}
  #       unit.id = u[data.meta.id]
  #       unit.price = u[data.meta.price]
  #       unit.imgUrl = data.meta.img_domain + u[data.meta.img_url]
  #       unit.bedrooms = u[data.meta.bedrooms]
  #       unit.bathrooms = u[data.meta.bathrooms]
  #       unit.address = u[data.meta.address]
  #       all.push unit
  #     filters.ranges.price.current = getEdges(all, 'price')
  #     filters.ranges.price.edges = getEdges(all, 'price')
  #     filters.ranges.bathrooms.current = getEdges(all, 'bathrooms')
  #     filters.ranges.bathrooms.edges = getEdges(all, 'bathrooms')
  #     filters.ranges.bedrooms.current = getEdges(all, 'bedrooms')
  #     filters.ranges.bedrooms.edges = getEdges(all, 'bedrooms')
      #applyFilters()
  

  convertToUnit = (u)->
    unit = {}
    unit.id = u[meta.id]
    unit.price = u[meta.price]
    unit.imgUrl = meta.img_domain + u[meta.img_url]
    unit.bedrooms = u[meta.bedrooms]
    unit.bathrooms = u[meta.bathrooms]
    unit.address = u[meta.address]
    unit

  load = (id)->
    server.areaUnits id, (data)->

      for u, i in data.units
        unit = {}
        unit.id = u[data.meta.id]
        unit.price = u[data.meta.price]
        unit.imgUrl = data.meta.img_domain + u[data.meta.img_url]
        unit.bedrooms = u[data.meta.bedrooms]
        unit.bathrooms = u[data.meta.bathrooms]
        unit.address = u[data.meta.address]
        all.push unit
      console.time('timer')
      console.log quickSort(all, 1)
      console.timeEnd('timer')


      meta = data.meta
      price_edges = getEdges(data.units, 'price')
      bathrooms_edges = getEdges(data.units, 'bathrooms')
      bedrooms_edges = getEdges(data.units, 'bedrooms')
      filters.ranges.price.current = [price_edges[0], price_edges[1]]
      filters.ranges.price.edges = [price_edges[0], price_edges[1]]
      filters.ranges.bathrooms.current = [bathrooms_edges[0], bathrooms_edges[1]]
      filters.ranges.bathrooms.edges = [bathrooms_edges[0], bathrooms_edges[1]]
      filters.ranges.bedrooms.current = [bedrooms_edges[0], bedrooms_edges[1]]
      filters.ranges.bedrooms.edges = [bedrooms_edges[0], bedrooms_edges[1]]


  sortedUnits = ()->
    all = orderByFilter all, filters.orderBy, filters.reverseIt

  
  unitsInRange = ->
    units = []
    for i in filters.inRangeIndexes
      units.push all[i]
    units


  
  selectPage = (pNum)->
    pNum = pNum-1
    perPageUnits = parseInt(pagination.numPerPage)-1
    orderedUnits = orderByFilter unitsInRange(), filters.orderBy, filters.reverseIt
    pageUnits = []
    for i in[(pNum*pagination.numPerPage)..(pNum*pagination.numPerPage)+pagination.numPerPage-1] 
      if all[filters.inRangeIndexes[i]]
        pageUnits.push all[filters.inRangeIndexes[i]]
    pageUnits

  currentPage = ->
    selectPage(pagination.currentPage)



  splitArr = (a)->
    midpoint = Math.floor a.length/2
    a1 = a.splice(midpoint)
    [a1, a]
  

  mergeSort = (arr, pos)->
    sorted = []
    if arr.length == 1
      return arr
    else
      spl = splitArr(arr)
      left = spl[0]
      right = spl[1]
      m1 = mergeSort(left, pos)
      m2 = mergeSort(right, pos)
      while m1.length > 0 && m2.length > 0 
        if m1[0][pos] < m2[0][pos]
          sorted.push m1.shift()
        else 
          sorted.push m2.shift()
      if m1.length == 0
        while m2.length > 0
          sorted.push m2.shift()
        return sorted
      if m2.length == 0
        while m1.length > 0
          sorted.push m1.shift()
        return sorted

  quickSort = (arr, pos)->
    if arr.length <= 1
      return arr
    else
      midpoint = Math.floor arr.length/2
      pivot = arr[midpoint]
      left = 0
      right = arr.length-1
      while left < midpoint-1 && right > midpoint+1
        if arr[length][pos] > pivot[pos] && arr[right][pos] < pivot[pos]
          temp = arr[right]
          arr[right] = arr[left]
          arr[right] = temp
          left = left + 1
          right = right-1
        else
          if arr[length][pos] > pivot[pos] && arr[right][pos] > pivot[pos]
            right = right-1
          else if arr[length][pos] < pivot[pos] && arr[right][pos] < pivot[pos]
            left = left-1
      lsorted = quickSort(arr[0..midpoint], pos)
      rsorted = quickSort(right[midpoint..arr.length-1], pos)
      lsorted.concat(rsorted)







  return { 
    all: all
    pagination: pagination 
    reSort: sortedUnits()
    filters: filters
    applyFilters: applyFilters
    load: load
    page: selectPage
    currentPage: currentPage
    mergeSort: mergeSort
    
    #inRange: @inRange()
  }