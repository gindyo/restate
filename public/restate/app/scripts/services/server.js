(function() {
  angular.module('Server', []).service('server', function($http) {
    var allAreas, areaUnits;
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
      var areas,
        _this = this;
      areas = [];
      return $http.get('/areas/all').success(function(data, status) {
        return callback(data);
      });
    };
    return {
      areaUnits: areaUnits,
      allAreas: allAreas
    };
  });

}).call(this);
