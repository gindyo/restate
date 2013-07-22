describe 'ResultsCtrl', ->
  controller = null
  scope = {}
    
  beforeEach module 'Results'
  

  beforeEach inject ($injector)=>
    scope =  $injector.get('$rootScope').$new
    server = {
      area_units: (callback)->  callback 'i was called'
    }
    area = {
      set_units: -> 'set_units was called'
      get_units: -> 'get_units was called'
    }
    controller = $injector.get('$controller')('ResultsCtrl', {
        $scope: scope
        server: server
        area: area
      })

  #it 'gets area_units from server', =>
    #expect(scope.area_units).toEqual 'i was called'