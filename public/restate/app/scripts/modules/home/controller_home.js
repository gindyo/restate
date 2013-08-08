(function() {
  angular.module('HomePage', ['Server']);

  angular.module('HomePage').controller('HomeCtrl', function($scope, server, units, $timeout) {
    var nextFeatured, stop, units_inst;
    $scope.styles = 'home-body';
    units_inst = new units();
    $scope.all_areas = [];
    $scope.featuredUnits = {};
    units_inst.pagination.numPerPage = 1;
    $scope.units = units_inst;
    if (!$scope.units.unitsLoaded()) {
      $scope.units.load(0);
    }
    $scope.featuredUnits['next'] = function() {
      if ($scope.units.pagination.currentPage < $scope.units.pagination.numOfPages()) {
        return $scope.units.pagination.currentPage = $scope.units.pagination.currentPage + 1;
      } else {
        return $scope.units.pagination.currentPage = 1;
      }
    };
    stop = 0;
    nextFeatured = function() {
      console.log(stop);
      $scope.featuredUnits.next();
      if (stop < 50) {
        stop = stop + 1;
        return $timeout(nextFeatured, 5000);
      }
    };
    $timeout(nextFeatured, 5000);
    server.allAreas(function(data) {
      return $scope.allAreas = data;
    });
    $scope.$watch('units.unitsLoaded()', function() {
      return $scope.featuredUnits.currentPage = $scope.units.currentPage();
    });
    return $scope.$watch('units.pagination.currentPage', function() {
      return $scope.featuredUnits.currentPage = $scope.units.currentPage();
    });
  });

}).call(this);
