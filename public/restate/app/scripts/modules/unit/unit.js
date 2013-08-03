(function() {
  angular.module('Unit').factory('unit', function(server) {
    var data, load, meta, pictures;
    data = [];
    meta = [];
    load = function(id) {
      return server.getUnit(id, function(response) {
        data = response.unit;
        return meta = response.meta;
      });
    };
    pictures = function() {
      var pic, _i, _len, _ref;
      pictures = [];
      if (data[meta.pictures]) {
        _ref = data[meta.pictures];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          pic = _ref[_i];
          pictures.push(meta.imgDomain + pic);
        }
      }
      return pictures;
    };
    return {
      load: load,
      pictures: data.pictures
    };
  });

}).call(this);
