angular.module('Server', []).service 'server', ($http)->
  area_units = (id)->
    returned_data = null
    $http.get '/areas/'+id+'/units', {
      success: (data)=>
        returned_data = data
      }
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