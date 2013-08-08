(function() {
  angular.module('Unit', []);

  angular.module('Unit').controller("UnitCtrl", function(unit, $scope, $routeParams) {
    $scope.unit = {};
    $scope.unit = new unit();
    $scope.unit.load($routeParams.id);
    $scope.$watch('unit.pictures.length > 0');
    $scope.dateOptions = {
      numberOfMonths: 3
    };
    $scope.maprefresh = false;
    $scope.mapselected = function() {
      return $scope.maprefresh = true;
    };
    $scope.$watch('center.latitude', function() {
      return console.log($scope.center);
    });
    return angular.extend($scope, {
      center: {
        latitude: 38.888,
        longitude: -84.556
      },
      markers: [],
      zoom: 8
    });
  });

}).call(this);
