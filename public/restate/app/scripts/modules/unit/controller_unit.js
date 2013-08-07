(function() {
  angular.module('Unit', []);

  angular.module('Unit').controller("UnitCtrl", function(unit, $scope, $routeParams) {
    $scope.unit = {};
    $scope.unit = new unit();
    $scope.unit.load($routeParams.id);
    $scope.$watch('unit.pictures.length > 0');
    return $scope.dateOptions = {
      numberOfMonths: 3
    };
  });

}).call(this);
