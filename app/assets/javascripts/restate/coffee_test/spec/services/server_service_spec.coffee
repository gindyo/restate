describe 'server_service', ->
  server = {}
  backEnd = {}
  beforeEach module('Server')

  beforeEach inject ($injector)->
    server = $injector.get('server')
    backEnd = $injector.get('$httpBackend')

  it 'gets area 1', ->
    backEnd.expectGET('/areas/1/units').respond 200, ''
    callback = -> 'blabla'
    server.area_units(1, callback)

  it 'gets all areas', ->
    backEnd.expectGET('/areas/all').respond 200, 'got it'
    server.all_areas((data)-> data)

  afterEach ->
    backEnd.flush()
    

