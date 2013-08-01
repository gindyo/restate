(function() {
  angular.module('Server', []).service('server', function($http) {
    var allAreas, areaUnits, getUnit;
    areaUnits = function(id, callback) {
      var returnedData, url,
        _this = this;
      returnedData = null;
      url = '/areas/' + id + '/units';
      $http.get(url).success(function(data) {
        return callback(data);
      });
      return returnedData;
    };
    allAreas = function(callback) {
      var _this = this;
      return $http.get('/areas/all').success(function(data, status) {
        return callback(data);
      });
    };
    getUnit = function(id, callback) {
      var _this = this;
      return $http.get('/units/' + id).success(function(data, status) {
        return callback(data);
      });
    };
    return {
      areaUnits: areaUnits,
      allAreas: allAreas,
      getUnit: getUnit
    };
  });

}).call(this);
