angular.module('Server', []).service 'server', ($http)->
  areaUnits = (id, callback)->
    returnedData = null
    url = '/areas/'+id+'/units'
    $http.get(url).
      success (data)=>
        callback data
      
    return returnedData
  allAreas = (callback)->
    $http.get('/areas/all')
    .success (data, status)=>
        callback data
  unit = (id, callback)->
    $http.get('/units/'+id)
    .success (data, status)=>
        callback data

  return {
    areaUnits: areaUnits
    allAreas: allAreas
    unit: unit
  }