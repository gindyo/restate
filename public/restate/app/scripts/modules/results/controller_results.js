(function() {
  var Results;

  Results = angular.module('Results', ['Server']);

  Results.controller('ResultsCtrl', function($scope, server, Units) {
    $scope.units = Units;
    return $scope.units.load();
  });

}).call(this);
