(function() {
  angular.module('Server', []).service('server', function($http) {
    var all_areas, area_units;
    area_units = function(id, callback) {
      var returned_data, url,
        _this = this;
      returned_data = null;
      url = '/areas/' + id + '/units';
      $http.get(url).success(function(data) {
        return callback(data);
      });
      return returned_data;
    };
    all_areas = function(callback) {
      var areas,
        _this = this;
      areas = [];
      return $http.get('/areas/all').success(function(data, status) {
        return callback(data);
      });
    };
    return {
      area_units: area_units,
      all_areas: all_areas
    };
  });

}).call(this);
