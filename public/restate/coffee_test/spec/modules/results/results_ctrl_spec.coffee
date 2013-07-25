describe 'ResultsCtrl', ->
  controller = null
  scope = {}
    
  beforeEach module 'Results'
  

  beforeEach inject ($injector)=>
    scope =  $injector.get('$rootScope').$new
    server = {}
    controller = $injector.get('$controller')('ResultsCtrl', {
      $scope: scope
      server: server
    })

  # it 'gets area_units from server', =>
  #   expect(scope.area_units).toEqual 'i was called'