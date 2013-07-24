(function() {
  angular.module('Results').service('Units', function(server, $filter) {
    var _this = this;
    this.all = {};
    this.load = function(id) {
      return server.area_units(id, function(data) {
        var i, u, unit, units, _i, _len, _ref;
        units = [];
        _ref = data.units;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          u = _ref[i];
          unit = {};
          unit.id = u[data.meta.id];
          unit.price = u[data.meta.price];
          unit.img_url = data.meta.img_domain + u[data.meta.img_url];
          unit.bedrooms = u[data.meta.bedrooms];
          unit.bathrooms = u[data.meta.bathrooms];
          unit.address = u[data.meta.address];
          units.push(unit);
        }
        return this.all = units;
      });
    };
    return {
      all: this.all,
      sorted_by: this.sorted_by,
      filters: this.filters,
      load: this.load
    };
  });

}).call(this);
