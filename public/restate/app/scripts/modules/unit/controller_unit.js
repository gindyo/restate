(function() {
  angular.module('Unit', []);

  angular.module('Unit').controller("UnitCtrl", function(unit, $scope, $routeParams) {
    $scope.unit = unit;
    $scope.unit.load($routeParams.id);
    $scope.$watch('unit.pictures[0]', function() {
      return $scope.pictures = $scope.unit.pictures;
    });
    return $scope.dateOptions = {
      numberOfMonths: 3
    };
  });

}).call(this);
