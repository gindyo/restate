(function() {
  angular.module('Unit').service('unit', function(server) {
    var data, load, meta, pictures;
    data = [];
    meta = [];
    load = function(id) {
      return server.getUnit(id, function(response) {
        data = response.unit;
        return meta = response.mata;
      });
    };
    pictures = function() {
      var pic, _i, _len, _ref;
      pictures = [];
      _ref = data[meta.pictures];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pic = _ref[_i];
        pictures.push(meta.imgDomain + pic);
      }
      return pictures;
    };
    return {
      load: load,
      pictures: pictures()
    };
  });

}).call(this);
