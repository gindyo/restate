angular.module('Server', []).service 'server', ($http)->
  area_units = (id, callback)->
    returned_data = null
    url = '/areas/'+id+'/units'
    $http.get(url).
      success (data)=>
        callback data
      
    return returned_data
  all_areas = (callback)->
    areas = []
    $http.get('/areas/all')
    .success (data, status)=>
        callback data

  return {
    area_units: area_units
    all_areas: all_areas
  }