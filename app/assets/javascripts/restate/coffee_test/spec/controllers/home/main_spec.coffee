describe 'MainCtrl', ->
  controller = null
  scope = {}
  
  
  beforeEach module 'HomePage'
  
  beforeEach inject ($injector)=>
    scope =  $injector.get('$rootScope').$new
    server = {
      all_areas: (callback)->  callback 'i was called'
    }
    controller = $injector.get('$controller')('MainCtrl', {
        $scope: scope
        server: server
      })

  it 'gets all_areas from server', =>
    expect(scope.all_areas).toEqual 'i was called'