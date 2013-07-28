(function() {
  var Results;

  Results = angular.module('Results', ['Server']);

  Results.controller('ResultsCtrl', function($scope, server, Units) {
    $scope.slidingMin = 0;
    $scope.slidingMax = 0;
    $scope.units = Units;
    $scope.units.load(1);
    $scope.$watch('[units.all[0], units.pagination, units.filters] | json', function() {
      console.log($scope.units.all);
      $scope.units.applyFilters();
      $scope.currentPage = $scope.units.currentPage();
      return $scope.units.loaded = true;
    });
    $scope.changePage = function(pNum) {
      return $scope.units.pagination.currentPage = pNum;
    };
    return $scope.testSort = function() {
      console.log($scope.units.all);
      return $scope.units.mergeSort($scope.units.all, 0);
    };
  });

}).call(this);
