(function() {
  angular.module('Results').controller('ResultsCtrl', function($scope, server) {
    $scope.area_units = [];
    $scope.$watch('area_id', function() {
      return server.area_units($scope.area_id, function(data) {
        return $scope.area_units = data;
      });
    });
    return $scope.$watch('area_units', function() {
      return $scope.units = $scope.area_units;
    });
  });

}).call(this);
