(function() {
  var Results;

  Results = angular.module('Results', ['Server']);

  Results.controller('ResultsCtrl', function($scope, server, Units) {
    var updatePage;
    $scope.slidingMin = 0;
    $scope.slidingMax = 0;
    $scope.units = Units;
    $scope.units.load(1);
    $scope.$watch('units.filters.inRangeIndexes[0] | json', function() {
      $scope.currentPage = $scope.units.currentPage();
      return $scope.units.applyFilters();
    });
    $scope.bathroomsSliderChange = function(values) {
      $scope.units.filters.ranges.bathrooms.current[0] = values.lo;
      $scope.units.filters.ranges.bathrooms.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    $scope.priceSliderChange = function(values) {
      $scope.units.filters.ranges.price.current[0] = values.lo;
      $scope.units.filters.ranges.price.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    $scope.bedroomsSliderChange = function(values) {
      $scope.units.filters.ranges.bedrooms.current[0] = values.lo;
      $scope.units.filters.ranges.bedrooms.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    updatePage = function() {
      return $scope.$apply(function() {
        return $scope.currentPage = $scope.units.currentPage();
      });
    };
    $scope.$watch('units.pagination.currenPage + units.pagination.numPerPage', function() {
      console.log($scope.units.pagination);
      return $scope.currentPage = $scope.units.currentPage();
    });
    $scope.$watch('units.filters.orderBy', function() {
      console.log('hi');
      $scope.units.resort();
      return $scope.currentPage = $scope.units.currentPage();
    });
    $scope.changePage = function(pNum) {
      $scope.units.pagination.currentPage = pNum;
      return $scope.currentPage = $scope.units.page(pNum);
    };
    return $scope.reverseOrder = function() {
      $scope.units.filters.reverseIt = !$scope.units.filters.reverseIt;
      $scope.units.resort();
      $scope.units.applyFilters();
      return $scope.currentPage = $scope.units.currentPage();
    };
  });

}).call(this);
