angular.module('Unit').service 'unit', (server)->
  data = []
  meta = []
  load = (id)->
    server.getUnit id, (response)->
      data = response.unit
      meta = response.meta
  pictures = ->
    pictures = []
    if data[meta.pictures]
      for pic in data[meta.pictures]
        pictures.push meta.imgDomain+pic
    return pictures
  {
    load: load
    pictures: pictures

  }