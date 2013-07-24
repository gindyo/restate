describe 'Units', ->
  units = {}
  server = {
    area_units: -> 'area_units was called'
  }
  
  beforeEach module 'Results'

  beforeEach ->
    module ($provide)->
      

  


  
  it 'loads units', =>
    spyOn server, 'area_units'
    expect(units.all).toEqual {}
    expect(server.area_units).toHaveBeenCalledWith(1, -> "some callback")
    units.load(1)