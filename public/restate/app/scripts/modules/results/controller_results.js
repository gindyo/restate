(function() {
  var Results;

  Results = angular.module('Results', ['Server']);

  Results.controller('ResultsCtrl', function($scope, server, $filter) {
    return $scope.area_units = 'i was called';
  });

}).call(this);
