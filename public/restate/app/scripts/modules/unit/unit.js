(function() {
  angular.module('Unit').factory('unit', function(server) {
    var unit;
    unit = function() {
      var load;
      unit = {};
      unit.data = [];
      unit.meta = [];
      unit.pictures = [];
      load = function(id) {
        server.getUnit(id, function(response) {
          var pic, _i, _len, _ref;
          unit.data = response.unit;
          unit.meta = response.meta;
          if (unit.data[unit.meta.pictures]) {
            _ref = unit.data[unit.meta.pictures];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              pic = _ref[_i];
              unit.pictures.push(unit.meta.imgDomain + pic);
            }
          }
        });
      };
      return {
        pictures: unit.pictures,
        load: load
      };
    };
    return unit;
  });

}).call(this);
