(function() {
  angular.module('Unit', []);

  angular.module('Unit').controller("UnitCtrl", function(unit, $scope, $routeParams) {
    $scope.unit = unit;
    $scope.unit.load($routeParams.id);
    return $scope.$watch('unit.pictures[0]', function() {
      return console.log($scope.unit.pictures());
    });
  });

}).call(this);
