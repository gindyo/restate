angular.module('Unit').factory 'unit', (server)->
  unit = ->
    unit = {}
    unit.data = []
    unit.meta = []
    unit.pictures = []
    load = (id)->
      server.getUnit id, (response)->
        unit.data = response.unit
        unit.meta = response.meta

        
        if unit.data[unit.meta.pictures]
          for pic in unit.data[unit.meta.pictures]
            unit.pictures.push unit.meta.imgDomain+pic
          return
      return
        
    {
      pictures: unit.pictures
      load: load
    }
  return unit