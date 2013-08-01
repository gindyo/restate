(function() {
  angular.module('Unit', []);

  angular.module('Unit').controller("UnitCtrl", function(unit) {
    return $scope.unit = unit;
  });

}).call(this);
